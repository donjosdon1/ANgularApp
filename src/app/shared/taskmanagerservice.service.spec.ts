import { TestBed, inject } from '@angular/core/testing';

import { TaskmanagerserviceService } from './taskmanagerservice.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

describe('TaskmanagerserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskmanagerserviceService,HttpClient,HttpClientModule],
      imports:[HttpClientModule,HttpModule]
    });
  });

  it('should be created', inject([TaskmanagerserviceService], (service: TaskmanagerserviceService) => {
    expect(service).toBeTruthy();
  }));
});
