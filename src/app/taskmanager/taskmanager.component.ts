import { Component, OnInit } from '@angular/core';
import{Taskdetails} from '../Models/taskdetails';
import {TaskmanagerserviceService} from '../shared/taskmanagerservice.service';
import { Http } from '@angular/http/src/http';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-taskmanager',
  templateUrl: './taskmanager.component.html',
  styleUrls: ['./taskmanager.component.css'],
  providers:[TaskmanagerserviceService],
})
export class TaskmanagerComponent implements OnInit {
taskdata:Taskdetails[];
taskdatetemp:Taskdetails[];
retdata:string;
task:string;
parent:string;
priorityfrom:number;
priorityto:number;
startdate:Date;
enddate:Date;

  constructor(private tmSvc:TaskmanagerserviceService, private _router:Router) {}

  ngOnInit() {
    
    this.tmSvc.GetAllTasks().subscribe(p=>
      {
        this.taskdata=p;
        this.taskdatetemp=p;
      });
  }
  CommonSearch()
  {
    this.taskdata=this.taskdatetemp;
    //task filter
    if(this.task!=undefined && this.task.trim()!="" )
    this.taskdata=this.taskdatetemp.filter(i=>i.task.toLowerCase().trim().includes(this.task.toLowerCase().trim()));
  //parent filter
    if(this.parent!=undefined && this.parent.trim()!="" )
    this.taskdata=this.taskdata.filter(i=>i.parent_task.toLowerCase().trim().includes(this.parent.toLowerCase().trim()));
//PriorityFrom
    if(this.priorityfrom==undefined || this.priorityfrom.toString()=="" )
    this.priorityfrom=0;
    if(this.priorityto==undefined || this.priorityto.toString()=="" )
    this.priorityto=30;
    this.taskdata=this.taskdata.filter(i=>i.priority>=this.priorityfrom && i.priority<=this.priorityto );
//StartDate
if(this.startdate!=undefined && this.startdate.toString()!="" )
    this.taskdata=this.taskdatetemp.filter(i=>  i.start_date.toString() == this.startdate.toString()+"T00:00:00" );
//EndDate
if(this.enddate!=undefined && this.enddate.toString()!="" )
    this.taskdata=this.taskdatetemp.filter(i=>  i.end_date.toString() == this.enddate.toString()+"T00:00:00" );
  }
  TaskSearch()
  {   this.CommonSearch();
    //this.taskdata=this.taskdatetemp.filter(i=>i.task.toLowerCase().trim().includes(this.task.toLowerCase().trim()));
  }
  ParentSearch()
  {
    this.CommonSearch();
    //this.taskdata=this.taskdatetemp.filter(i=>i.parent_task.toLowerCase().trim().includes(this.parent.toLowerCase().trim()));
  }
  PriorityFromSearch()
  {this.CommonSearch();
    //if(this.priorityfrom==undefined)
    //this.priorityfrom=0;
    //if(this.priorityto==undefined)
    //this.priorityto=30;
    //this.taskdata=this.taskdatetemp.filter(i=>i.priority>=this.priorityfrom && i.priority<=this.priorityto );
  }
  PriorityToSearch()
  {this.CommonSearch();
    //if(this.priorityfrom==undefined)
    //this.priorityfrom=0;
    //if(this.priorityto==undefined)
    //this.priorityto=30;
    //this.taskdata=this.taskdatetemp.filter(i=>i.priority>=this.priorityfrom && i.priority<=this.priorityto );
  }
  StartDateSearch()
  {    this.CommonSearch();
    //if(this.startdate!=undefined && this.startdate.toString()!="" )
    //this.taskdata=this.taskdatetemp.filter(i=>  i.start_date.toString() == this.startdate.toString()+"T00:00:00" );
    //else
    //this.taskdata=this.taskdatetemp;
  }
  EndDateSearch()
  {this.CommonSearch();
    //this.taskdata=this.taskdatetemp.filter(i=>i.end_date==this.enddate );
  }

  EditTask(obj:Taskdetails)
  {
    this._router.navigate(['edit' , obj.task_id ]);
  }
  EndTask(taskid:number)
  {
    if(confirm("Are you sure to End this task?"))
    this.tmSvc.EndTask(taskid).subscribe(p=>
      {
      this.retdata=p;
      this.tmSvc.GetAllTasks().subscribe(p=>{this.taskdata=p;
      alert("Task ended successfully!!");
      });
    }
    );
  }
  checkButtonEnable = function(flag:string) {
    if (flag == "1") {
     return true;
    }
    else {
     return false;
    }
    };
}
