import { Component, OnInit } from '@angular/core';
import{Taskdetails} from '../Models/taskdetails';
import {TaskmanagerserviceService} from '../shared/taskmanagerservice.service';
import { Http } from '@angular/http/src/http';
import { ActivatedRoute, Params } from '@angular/router'; 
import { NgForm } from '@angular/forms';

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
newTask:Taskdetails=new Taskdetails();

id:number;
  constructor(public tmSvc:TaskmanagerserviceService,private _activeRoute:ActivatedRoute) { }

  ngOnInit() {
    this.resetForm();
    this.tmSvc.GetAllTasks().subscribe(p=>this.taskdata=p);
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
      taskended:0
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

}
