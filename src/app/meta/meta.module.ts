import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MetaSenderComponent} from './meta-sender/meta-sender.component';
import {ProductsComponent} from "./products/products.component";
import {UtilModule} from '../util/util.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UtilModule
  ],
  declarations: [MetaSenderComponent, ProductsComponent],
  exports: [MetaSenderComponent, ProductsComponent]
})
export class MetaModule {
}
