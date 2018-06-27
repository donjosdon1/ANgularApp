import { Component, OnInit } from '@angular/core';
import{Product} from './Models/product';
import {ProductServiceService} from './shared/product-service.service';
//import {UserserviceService} from './shared/userservice.service';
import { userdetails } from './Models/userdetails';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ProductServiceService]  
})
export class AppComponent {
  title = 'TaskManager';
  svc:ProductServiceService;
  userdata:userdetails[];
  prod:Product[];
  p:Product;
  ud:userdetails=new userdetails();

  constructor()
  {
      this.svc = new ProductServiceService();
      /*this.prod=this.svc.getProducts();
      this.p=new Product();
      this.p.pid=4000;
      this.p.pname='name';
      this.p.price=2000;
      this.svc.Add(this.p);    
      this.ud.id=1001;
      this.ud.userId=10012;
      this.ud.title="TestProd";
      this.ud.body="TestBody";
      this.userservice.Add(this.ud);*/
  }
  ngOnInit()
  {
   /*this.userservice.GetAll().subscribe(p=>this.userdata=p);
    
    this.ud.userId=10012;
    this.ud.title="TestProd";
    this.ud.body="TestBody";
    this.userservice.Add(this.ud);*/
  }
}
