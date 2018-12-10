import { Component, OnInit } from '@angular/core';
import{userdetails} from '../Models/userdetails';
import {TaskmanagerserviceService} from '../shared/taskmanagerservice.service';
import { Http } from '@angular/http/src/http';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.css'],
  providers:[TaskmanagerserviceService],
})
export class ViewusersComponent implements OnInit {
userdata:userdetails[];
userdatatemp:userdetails[];
retdata:string;
firstname:string;
lastname:string;
employee_id:string;

  constructor(private tmSvc:TaskmanagerserviceService, private _router:Router) {}
  ngOnInit() {    
    this.tmSvc.GetAllUsers().subscribe(p=>
      {
        this.userdata=p;
        this.userdatatemp=p;
      });
  }
  CommonSearch()
  {
    this.userdata=this.userdatatemp;
    //firstname filter
    if(this.firstname!=undefined && this.firstname.trim()!="" )
    this.userdata=this.userdatatemp.filter(i=>i.firstname.toLowerCase().trim().includes(this.firstname.toLowerCase().trim()));
  //lastname filter
    if(this.lastname!=undefined && this.lastname.trim()!="" )
    this.userdata=this.userdata.filter(i=>i.lastname.toLowerCase().trim().includes(this.lastname.toLowerCase().trim()));
  //employee_id filter
    if(this.employee_id!=undefined && this.employee_id.trim()!="" )
    this.userdata=this.userdata.filter(i=>i.employee_id.toLowerCase().trim().includes(this.employee_id.toLowerCase().trim()));
  }
  FirstNameSearch()
  {   this.CommonSearch();    
  }
  LastNameSearch()
  {
    this.CommonSearch();    
  }
  EmployeeIDSearch()
  {
    this.CommonSearch();    
  }

  EditUser(obj:userdetails)
  {
    this._router.navigate(['edituser' , obj.user_id ]);
  }
  sortbyfname(t:string)
  {
    if(t=='asc')
    this.userdata = this.userdata.sort((a,b)=>a.firstname.localeCompare(b.firstname));
    else
    this.userdata = this.userdata.sort((a,b)=>b.firstname.localeCompare(a.firstname));
  }
  sortbylname(t:string)
  {
    if(t=='asc')
    this.userdata = this.userdata.sort((a,b)=>a.lastname.localeCompare(b.lastname));
    else
    this.userdata = this.userdata.sort((a,b)=>b.lastname.localeCompare(a.lastname));
  }
  sortbyempid(t:string)
  {
    if(t=='asc')
    this.userdata = this.userdata.sort((a,b)=>a.employee_id.localeCompare(b.employee_id));
    else
    this.userdata = this.userdata.sort((a,b)=>b.employee_id.localeCompare(a.employee_id));
  }
}
