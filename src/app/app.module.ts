import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
//import {UserserviceService} from './shared/userservice.service';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {TaskmanagerComponent} from './taskmanager/taskmanager.component'
import { TaskmanagerserviceService } from './shared/taskmanagerservice.service';
import { AddtaskComponent } from './addtask/addtask.component';
import { HttpClientModule } from '@angular/common/http'; 
import { routing } from './app.routing';
import { AdduserComponent } from './adduser/adduser.component';
@NgModule({
  declarations: [
    AppComponent,
    TaskmanagerComponent,
    AddtaskComponent,
    AdduserComponent,
  ],
  imports: [
    BrowserModule,HttpModule,FormsModule,HttpClientModule,routing,FormsModule
  ],
  providers: [TaskmanagerserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
