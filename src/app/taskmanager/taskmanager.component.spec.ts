import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskmanagerComponent } from './taskmanager.component';
import { FormsModule } from '@angular/forms';
import {TaskmanagerserviceService} from '../shared/taskmanagerservice.service';
//import { Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router'; 
import { NgForm } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
describe('TaskmanagerComponent', () => {
  let component: TaskmanagerComponent;
  let fixture: ComponentFixture<TaskmanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule,HttpClientTestingModule,HttpModule,RouterTestingModule ],
      providers:[TaskmanagerserviceService],
      declarations: [ TaskmanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 it('Enable EndTask button',()=>{
    component.checkButtonEnable('1')
    expect(true).toBe(component.checkButtonEnable('1')) 
  });
  it('Disable EndTask button',()=>{
    component.checkButtonEnable('0')
    expect(false).toBe(component.checkButtonEnable('0')) 
  });

});
