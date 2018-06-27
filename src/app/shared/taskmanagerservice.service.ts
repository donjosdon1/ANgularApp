import { Injectable } from '@angular/core';
import {Taskdetails} from '../Models/taskdetails';
import {Observable} from 'rxjs'
import {Http,Response} from '@angular/http';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';  
//import 'rxjs/add/operator/map';
//import './rxjs-operators';
import {map} from 'rxjs/operators';
@Injectable()
export class TaskmanagerserviceService {
  selectedTask:Taskdetails;
getURL:string = "http://localhost/TaskManagerWebApi/api/GetAllTasksJoin";
saveURL:string = "http://localhost/TaskManagerWebApi/api/AddTaskwithParent";
editURL:string = "http://localhost/TaskManagerWebApi/api/EditTask";
getURLByID:string = "http://localhost/TaskManagerWebApi/api/GetTaskByID/";
endTaskURL:string = "http://localhost/TaskManagerWebApi/api/EndTask/";
  constructor(private http:HttpClient,private httpget:Http) { }
  GetAllTasks():Observable<Taskdetails[]>
  {
    return this.httpget.get(this.getURL)
    .pipe(map((data:Response)=><Taskdetails[]>data.json()))
  }
  GetTaskByID(task_id:number):Observable<Taskdetails[]>
  {
    return this.httpget.get(this.getURLByID + task_id )
    .pipe(map((data:Response)=><Taskdetails[]>data.json()));    
  }
  Add(task:Taskdetails)  
{ 
  const headers = new HttpHeaders().set('content-type', 'application/json');  
  var body = { parent_id:task.parent_id, task:task.task, start_date:task.start_date,end_date:task.end_date,priority:task.priority,taskended:0}  
  
return this.http.post<Taskdetails>(this.saveURL,body,{headers})  
  
}
Edit(task:Taskdetails)  
{ 
  const headers = new HttpHeaders().set('content-type', 'application/json');  
  var body = {task_id:task.task_id, parent_id:task.parent_id, task:task.task, start_date:task.start_date,end_date:task.end_date,priority:task.priority,taskended:0}    
return this.http.post<Taskdetails>(this.editURL,body,{headers})    
}
EndTask(task_id:number) :Observable<string> 
{ 
  return this.httpget.get(this.endTaskURL + task_id )
    .pipe(map((data:Response)=><string>data.json()));        
}

}
