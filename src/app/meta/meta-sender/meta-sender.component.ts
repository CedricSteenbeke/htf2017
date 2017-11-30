import {Component, OnInit} from '@angular/core';
import {Web3Service} from '../../util/web3.service';
import metacoin_artifacts from '../../../../build/contracts/MetaCoin.json';
import shop_artifacts from '../../../../build/contracts/Shop.json';

@Component({
  selector: 'app-meta-sender',
  templateUrl: './meta-sender.component.html',
  styleUrls: ['./meta-sender.component.css']
})
export class MetaSenderComponent implements OnInit {
  accounts: string[];
  allAccounts: Array<{ owner: string, address: string }>;
  MetaCoin: any;

  model = {
    amount: 5,
    receiver: '',
    balance: 0,
    account: ''
  };

  status = '';
  transactionList;
  outgoingTransactions = 'bliep';
  products: Array<{ name: string }>;
  Shop: any;

  constructor(private web3Service: Web3Service) {
    console.log('Constructor: ' + web3Service);
  }

  ngOnInit(): void {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    this.transactionList = [];
    this.watchAccount();
    this.web3Service.artifactsToContract(metacoin_artifacts)
      .then((MetaCoinAbstraction) => {
        this.MetaCoin = MetaCoinAbstraction;
      });
    this.web3Service.artifactsToContract(shop_artifacts)
      .then((ShopAbstraction) => {
        this.Shop = ShopAbstraction;
      });
    this.getProducts();
  }

  getProducts(): void {
    //const deployedShop = this.Shop.deployed();
    //this.products = deployedShop.getProducts.call({from:this.model.account});
  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
      this.allAccounts = [
        {
          'owner': `Leander`,
          'address': accounts[0]
        }, {
          'owner': 'Cedric',
          'address': '0x6261391b8061d1c7f64df06cd4235fd6e842c4fe'
        }
      ];
      this.refreshBalance();
    });
  }

  async submitProduct(product) {
    console.log(product.value); //=> steeds leeg object
    if (!this.Shop) {
      this.setStatus('Shop is not loaded');
    }
    const deployedShop = await this.Shop.deployed();
    const id = product.value.id;
    const name = product.value.name;
    const price = product.value.price;
    const sendProduct = await deployedShop.registerProduct.sendTransaction(id, name, '', price, 1);
    if (!sendProduct) {
      this.setStatus('Product not registered!');
      // TODO: send price to ...
    } else {
      this.setStatus('Transaction complete');
    }
  }

  setStatus(status) {
    this.status = status;
  }

  async sendCoin() {
    if (!this.MetaCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }

    const amount = this.model.amount;
    const receiver = this.model.receiver;

    console.log('Sending coins' + amount + ' to ' + receiver);

    this.setStatus('Initiating transaction... (please wait)');
    try {
      const deployedMetaCoin = await this.MetaCoin.deployed();
      const transaction = await deployedMetaCoin.sendCoin.sendTransaction(receiver, amount, {from: this.model.account});

      if (!transaction) {
        this.setStatus('Transaction failed!');
      } else {
        this.setStatus('Transaction complete!');
        this.outgoingTransactions = 'amount:' + amount + ' to ' + receiver;
        this.transactionList.push({'reciever': receiver, 'amount': amount, 'ts': new Date()});
        console.log(this.transactionList);
        this.refreshTransactions();
      }
    } catch (e) {
      console.log(e);
      this.setStatus('Error sending coin; see log.');
    }
  }

  async refreshBalance() {
    console.log('Refreshing balance');

    try {
      const deployedMetaCoin = await this.MetaCoin.deployed();
      const metaCoinBalance = await deployedMetaCoin.getBalance.call(this.model.account);
      console.log('Found balance: ' + metaCoinBalance);
      this.model.balance = metaCoinBalance;
    } catch (e) {
      console.log(e);
      this.setStatus('Error getting balance; see log.');
    }
  }

  async refreshTransactions() {
    console.log('fetching transactions');
    try {
      let tmpTransactionList = "";
      for (var i = 0; i < this.transactionList.length; i++) {
        tmpTransactionList += '<li>' + this.transactionList[i].ts + ' - Send: ' + this.transactionList[i].amount
          + ' to: ' + this.transactionList[i].reciever + '</li>';
      }
      this.outgoingTransactions = tmpTransactionList;
    } catch (e) {
      console.log(e);
      this.setStatus("Error fetching transactions");
    }
  }

  clickAddress(e) {
    this.model.account = e.target.value;
    this.refreshBalance();
  }

  clickSendAddress(e) {
    this.model.receiver = e.target.value;
  }

  setAmount(e) {
    console.log('Setting amount: ' + e.target.value);
    this.model.amount = e.target.value;
  }

  setReceiver(e) {
    console.log('Setting receiver: ' + e.target.value);
    this.model.receiver = e.target.value;
  }
}
