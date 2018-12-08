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
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css'],
  providers:[TaskmanagerserviceService],
})
export class AdduserComponent implements OnInit {
task_id:number;
parent_id:number;
task:string;
parent_task:string;
start_date:string;
end_date:string;
priority:number;
taskended:number;
taskdata:Taskdetails[];
edituserdata:userdetails[];
projectdata:projectdetails[];
newTask:Taskdetails=new Taskdetails();
newUser:userdetails=new userdetails();
userdata:userdetails[];
id:number;
  constructor(public tmSvc:TaskmanagerserviceService,private _activeRoute:ActivatedRoute) { }

  ngOnInit() {
    this.resetForm();
    //this.tmSvc.GetAllTasks().subscribe(p=>this.taskdata=p);//tasks
    //this.tmSvc.GetAllProjects().subscribe(p=>this.projectdata=p);//projects
    //this.tmSvc.GetAllUsers().subscribe(p=>this.userdata=p);//users
    this.id = this._activeRoute.snapshot.params['id'];
    if(this.id!=null)
    {
      this.tmSvc.GetUserByID(this.id).subscribe(p=>
        {
        this.edituserdata=p;
        this.tmSvc.selectedUser=this.edituserdata[0];    
        //remove the current task from parent task list
        
        }
      );
    }
        
    
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();      
      if(this.tmSvc.selectedUser!=null &&  this.tmSvc.selectedUser.user_id!=null)
      {
        alert(this.tmSvc.selectedUser.user_id);
      }
      else
      {
    this.tmSvc.selectedUser = {
      user_id:0,
      firstname:'',
      lastname:'',
      employee_id:'',
      project_id:0,
      task_id:0
    }
  }

  }
  AddUser(u:userdetails)
  {debugger
    if(u!=undefined)
    {
    this.newUser.employee_id = u.employee_id;
    this.newUser.firstname = u.firstname;
    this.newUser.lastname = u.lastname;
    this.newUser.project_id = u.project_id;
    this.newUser.task_id = u.task_id;
    this.newUser.user_id = u.user_id;
      
    this.tmSvc.AddUser(this.newUser).subscribe(res=>  
      {  
        this.userdata.push(res);  
        alert("Data added successfully !! ")          
      })  
      ,err=>  
      {  
        console.log("Error Occured " + err);  
      }  
    }
  }
  onSubmit(form: NgForm) {
    if (form.value.user_id == 0) {
      this.tmSvc.AddUser(form.value)
        .subscribe(data => {
          this.resetForm(form);      
          alert('Data added successfully!!');       
        })
    }
    else {
      this.tmSvc.EditUser(form.value)
      .subscribe(data => {
        this.resetForm(form);
        alert('Data updated successfully!!');        
      });
    }
  }

}
