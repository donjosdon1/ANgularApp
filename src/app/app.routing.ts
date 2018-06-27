import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TaskmanagerComponent} from './taskmanager/taskmanager.component';
import {AddtaskComponent} from './addtask/addtask.component';
import {AppComponent} from './app.component';
 
const appRoutes : Routes =
  [
    {
      path: '',
      component: TaskmanagerComponent
    },
    {
      path: 'view',
      component: TaskmanagerComponent
    },
    {
      path: 'add',
      component: AddtaskComponent,
    },
    {
      path: 'edit',
      component: AddtaskComponent,
 
    },
    {
        path: 'edit/:id',
        component: AddtaskComponent,
    },
    {
      path: '**',
      component: TaskmanagerComponent
    }
  ];
 
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);