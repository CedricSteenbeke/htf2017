// npm install --save-dev truffle-hdwallet-provider
const HDWalletProvider = require('truffle-hdwallet-provider');

// mnemonic, which MetaMask has given to you at the creation of the vault.
// Forgot mnemonic? (12-word phrase). Remove the MetaMask extension and reinstall it, now write down the mnemonic :)
const mnemonic = '<MNEMONIC_HERE>';

// API key from https://infura.io/register.html (register and get the key from the received email)
const infura_apikey = '<API_KEY_HERE>';

// command to compile contract & deploy it to ropsten: truffle migrate --network ropsten
// changes in contract don't persist? Delete the build folder and/or use: truffle migrate --network ropsten --reset
module.exports = {
  networks: {
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"+ infura_apikey),
      gas: 500000,
      network_id: 3 // 1 = Ethereum public main net, 2 = Ethereum testnet, 3 = Ropsten testnet
    },
    // Don't want to use ropsten? Tired of waiting? Use Truffle Develop (Alternative to TestRPC)
    // In terminal type: truffle develop
    // Migrate using: truffle migrate --network develop
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 500000
    }
  }
};
