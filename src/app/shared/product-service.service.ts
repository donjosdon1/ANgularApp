import { Injectable } from '@angular/core';
import{Product} from '../Models/product';
@Injectable()
export class ProductServiceService {
productlist:Product[];
  constructor() { 
    this.productlist=[
{pid:1,pname:'Prod1',price:1000},
{pid:2,pname:'Prod2',price:2000},
{pid:3,pname:'Prod3',price:3000},
    ];
  }
  getProducts():Product[]
  {
      return this.productlist;
  }
  Add(product)
  {
    this.productlist.push(product);
  }
}
