import { Component, OnInit } from '@angular/core';
import{Taskdetails} from '../Models/taskdetails';
import {projectdetails} from '../Models/projectdetails';
import {projects} from '../Models/projects';
import {userdetails} from '../Models/userdetails';
import {TaskmanagerserviceService} from '../shared/taskmanagerservice.service';
import { Http } from '@angular/http/src/http';
import { ActivatedRoute, Params } from '@angular/router'; 
import { NgForm } from '@angular/forms';
import { debug } from 'util';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css'],
  providers:[TaskmanagerserviceService],
})
export class AddtaskComponent implements OnInit {
task_id:number;
parent_id:number;
task:string;
parent_task:string;
start_date:string;
end_date:string;
priority:number;
taskended:number;
taskdata:Taskdetails[];
edittaskdata:Taskdetails[];
projectdata:projects[];
newTask:Taskdetails=new Taskdetails();
userdata:userdetails[];
id:number;
  constructor(public tmSvc:TaskmanagerserviceService,private _activeRoute:ActivatedRoute) { }

  ngOnInit() {
    this.resetForm();
    this.tmSvc.GetAllTasks().subscribe(p=>this.taskdata=p);//tasks
    this.tmSvc.GetAllProjects().subscribe(p=>this.projectdata=p);//projects
    this.tmSvc.GetAllUsers().subscribe(p=>this.userdata=p);//users
    this.id = this._activeRoute.snapshot.params['id'];
    if(this.id!=null)
    {
      this.tmSvc.GetTaskByID(this.id).subscribe(p=>
        {
        this.edittaskdata=p;
        this.tmSvc.selectedTask=this.edittaskdata[0];    
        //remove the current task from parent task list
        this.taskdata=this.taskdata.filter(item=> item.task_id != this.id );
        }
      );
    }
        
    
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();      
      if(this.tmSvc.selectedTask!=null &&  this.tmSvc.selectedTask.task_id!=null)
      {
        alert(this.tmSvc.selectedTask.task_id);
      }
      else
      {
    this.tmSvc.selectedTask = {
      task_id:0,
      parent_id:0,
      task:'',
      parent_task:'',
      start_date:null,
      end_date:null,
      priority:0,
      taskended:0,
      project_id:0,
      user_id:0,
      project:'',
      username:'',
      isparent:false
    }
  }

  }
  Add(t:Taskdetails)
  {
    if(t!=undefined)
    {
    this.newTask.task=t.task;
    this.newTask.parent_id=(t.parent_id==0?null:t.parent_id);
    this.newTask.priority=t.priority;
    this.newTask.start_date=t.start_date;
    this.newTask.end_date=t.end_date;
    this.newTask.taskended=0;
    this.newTask.project_id=t.project_id;
    this.newTask.user_id=t.user_id;
    this.newTask.username=t.username;
    this.newTask.project=t.project;
    this.newTask.isparent=t.isparent;      
    

    this.tmSvc.Add(this.newTask).subscribe(res=>  
      {  
        this.taskdata.push(res);  
        alert("Data added successfully !! ")          
      })  
      ,err=>  
      {  
        console.log("Error Occured " + err);  
      }  
    }
  }
  onSubmit(form: NgForm) {
    if (form.value.task_id == 0) {
      this.tmSvc.Add(form.value)
        .subscribe(data => {
          this.resetForm(form);      
          alert('Data added successfully!!');       
        })
    }
    else {
      this.tmSvc.Edit(form.value)
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
  this.tmSvc.selectedTask.username = p.firstname + " " + p.lastname;
  this.tmSvc.selectedTask.user_id=p.user_id;
  document.getElementById("btnCloseUserModal").click;  
}
parentselected(e)
{
  if(e.target.checked)
  {
    document.getElementById('trparent').style.display='none';
    document.getElementById('trpriority').style.display='none';
    document.getElementById('trstartdate').style.display='none';
    document.getElementById('trenddate').style.display='none';
    document.getElementById('truser').style.display='none';
  }
  else
  {
    document.getElementById('trparent').style.display='';
    document.getElementById('trpriority').style.display='';
    document.getElementById('trstartdate').style.display='';
    document.getElementById('trenddate').style.display='';
    document.getElementById('truser').style.display='';
  }
}
checkRequired()
{
  //check mandatory fields
  debugger;
  if(this.newTask.project.trim()=="" || this.newTask.task.trim()=="")
  {    
    return false;
  }
  else
  return true;
//
}

}
