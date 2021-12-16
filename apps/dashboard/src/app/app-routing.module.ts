import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsGuardGuard } from './projects/project-edit/projects-guard.guard';

const routes: Routes = [
    { path: 'projects', component: ProjectsComponent },
    { 
      path: 'projects/:id', 
      component: ProjectEditComponent,
      canDeactivate: [ProjectsGuardGuard]
     },
    { 
      path: 'projects/add', 
      component: ProjectEditComponent,
      canDeactivate: [ProjectsGuardGuard]
     },
    { path: '**', redirectTo: 'projects', pathMatch: 'full' }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }