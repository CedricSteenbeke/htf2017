import {Component, OnInit} from '@angular/core';
import metacoin_artifacts from '../../../../build/contracts/MetaCoin.json';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})

export class ProductsComponent implements OnInit {
  products: Array<{name: string}>;
  products = [
    {
      name: 'GSM'
    },{
      laptop: 'Laptop'
    }
  ];
}
