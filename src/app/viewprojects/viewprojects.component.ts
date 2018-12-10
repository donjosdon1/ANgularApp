import { Component, OnInit } from '@angular/core';
import{Taskdetails} from '../Models/taskdetails';
import {TaskmanagerserviceService} from '../shared/taskmanagerservice.service';
import { Http } from '@angular/http/src/http';
import {Router, ActivatedRoute} from '@angular/router';
import { projects } from '../Models/projects';

@Component({
  selector: 'app-viewprojects',
  templateUrl: './viewprojects.component.html',
  styleUrls: ['./viewprojects.component.css'],
  providers:[TaskmanagerserviceService],
})
export class ViewprojectsComponent implements OnInit {
projectdata:projects[];
projectdatatemp:projects[];
retdata:string;
project:string;
parent:string;
priorityfrom:number;
priorityto:number;
startdate:Date;
enddate:Date;
priority:number;
numberoftasks:number;
completed:string;

  constructor(private tmSvc:TaskmanagerserviceService, private _router:Router) {}

  ngOnInit() {
    
    this.tmSvc.GetAllProjects().subscribe(p=>
      {
        this.projectdata=p;
        this.projectdatatemp=p;
      });
  }
  CommonSearch()
  {
    this.projectdata=this.projectdatatemp;
    //project filter
    if(this.project!=undefined && this.project.trim()!="" )
    this.projectdata=this.projectdatatemp.filter(i=>i.project.toLowerCase().trim().includes(this.project.toLowerCase().trim()));
//PriorityFrom
    if(this.priorityfrom==undefined || this.priorityfrom.toString()=="" )
    this.priorityfrom=0;
    if(this.priorityto==undefined || this.priorityto.toString()=="" )
    this.priorityto=30;
    this.projectdata=this.projectdata.filter(i=>i.priority>=this.priorityfrom && i.priority<=this.priorityto );
//StartDate
if(this.startdate!=undefined && this.startdate.toString()!="" )
    this.projectdata=this.projectdata.filter(i=>  i.startdate.toString() == this.startdate.toString()+"T00:00:00" );
//EndDate
if(this.enddate!=undefined && this.enddate.toString()!="" )
    this.projectdata=this.projectdata.filter(i=>  i.enddate.toString() == this.enddate.toString()+"T00:00:00" );
    //numberoftasks
    if(this.numberoftasks!=undefined && this.numberoftasks>=0 )
    this.projectdata=this.projectdata.filter(i=>i.numberoftasks==this.numberoftasks);
  }
  ProjectSearch()
  { 
    this.CommonSearch();    
  }
  
  PriorityFromSearch()
  {
    this.CommonSearch();    
  }
  PriorityToSearch()
  {
    this.CommonSearch();    
  }
  StartDateSearch()
  { 
    this.CommonSearch();    
  }
  EndDateSearch()
  {
    this.CommonSearch();    
  }

  EditProject(obj:projects)
  {
    this._router.navigate(['editproject' , obj.project_id]);
  }

}
