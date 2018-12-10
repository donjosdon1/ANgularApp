import { Component, OnInit } from '@angular/core';
import{Taskdetails} from '../Models/taskdetails';
import {projectdetails} from '../Models/projectdetails';
import {userdetails} from '../Models/userdetails';
import {TaskmanagerserviceService} from '../shared/taskmanagerservice.service';
import { Http } from '@angular/http/src/http';
import { ActivatedRoute, Params } from '@angular/router'; 
import { NgForm } from '@angular/forms';
import { debug } from 'util';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css'],
  providers:[TaskmanagerserviceService],
})
export class AddprojectComponent implements OnInit {
task_id:number;
parent_id:number;
task:string;
parent_task:string;
start_date:string;
end_date:string;
priority:number;
taskended:number;
taskdata:Taskdetails[];
editprojectdata:projectdetails[];
projectdata:projectdetails[];
newProject:projectdetails=new projectdetails();
userdata:userdetails[];
id:number;
  constructor(public tmSvc:TaskmanagerserviceService,private _activeRoute:ActivatedRoute) { }

  ngOnInit() {
    this.resetForm();
    /*this.tmSvc.GetAllTasks().subscribe(p=>this.taskdata=p);//tasks
    this.tmSvc.GetAllProjects().subscribe(p=>this.projectdata=p);//projects*/
    this.tmSvc.GetAllUsers().subscribe(p=>this.userdata=p);//users
    this.id = this._activeRoute.snapshot.params['id'];
    if(this.id!=null)
    {
      this.tmSvc.GetProjectByID(this.id).subscribe(p=>
        {
        this.editprojectdata=p;
        this.tmSvc.selectedProject=this.editprojectdata[0];    
        //remove the current task from parent task list
        //this.projectdata=this.taskdata.filter(item=> item.task_id != this.id );
        }
      );
    }
       
    
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();      
      if(this.tmSvc.selectedProject!=null &&  this.tmSvc.selectedProject.project_id!=null)
      {
        alert(this.tmSvc.selectedProject.project_id);
      }
      else
      {
    this.tmSvc.selectedProject = {
    project_id:0,
    project:'',
    startdate:null,
    enddate:null,
    priority:0,
    user_id:0,
    username:''
    }
  }

  }
  AddProject(p:projectdetails)
  {debugger;
    if(p!=undefined)
    {
    this.newProject.enddate=p.enddate;
    this.newProject.priority = p.priority;
    this.newProject.project = p.project;
    this.newProject.project_id = p.project_id;
    this.newProject.startdate = p.startdate;
    this.newProject.user_id = p.user_id;
    
    this.tmSvc.AddProject(this.newProject).subscribe(res=>  
      {  
        this.projectdata.push(res);  
        alert("Data added successfully !! ")          
      })  
      ,err=>  
      {  
        console.log("Error Occured " + err);  
      }  
    }
  }
  onSubmit(form: NgForm) {
    if (form.value.project_id != undefined &&  form.value.project_id == 0) {
      this.tmSvc.AddProject(form.value)
        .subscribe(data => {
          this.resetForm(form);      
          alert('Data added successfully!!');       
        })
    }
    else {
      this.tmSvc.EditProject(form.value)
      .subscribe(data => {
        this.resetForm(form);
        alert('Data updated successfully!!');        
      });
    }
  }
  parseDate(dateString: string): Date {
    debugger;
    if (dateString) {
        return new Date(dateString);
    } else {
        return null;
    }
}
assignProject(p:projectdetails)
{
  this.tmSvc.selectedTask.project=p.project;
  this.tmSvc.selectedTask.project_id=p.project_id;
  document.getElementById("btnCloseProjectModal").click;
}
assignParent(p:Taskdetails)
{
  //debugger;
  this.tmSvc.selectedTask.parent_task=p.task;
  this.tmSvc.selectedTask.parent_id=p.task_id;
  document.getElementById("btnCloseParentModal").click;  
}
assignUser(p:userdetails)
{
  //debugger;
  this.tmSvc.selectedProject.username = p.firstname + " " + p.lastname;
  this.tmSvc.selectedProject.user_id=p.user_id;
  document.getElementById("btnCloseUserModal").click;  
}

}

