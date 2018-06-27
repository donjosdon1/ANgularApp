import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { AddtaskComponent } from './addtask.component';
import {TaskmanagerserviceService} from '../shared/taskmanagerservice.service';
//import { Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router'; 
import { NgForm } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
describe('AddtaskComponent', () => {
  let component: AddtaskComponent;
  let fixture: ComponentFixture<AddtaskComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  }as ActivatedRoute;;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtaskComponent ],
      imports: [ FormsModule,HttpClientTestingModule,HttpModule,RouterTestingModule ],
      providers:[TaskmanagerserviceService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
