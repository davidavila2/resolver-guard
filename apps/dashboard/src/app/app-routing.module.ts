import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsGuardGuard } from './projects/project-edit/projects-guard.guard';
import { ProjectResolverResolver } from './projects/project-edit/project-resolver.resolver';

const routes: Routes = [
    { path: 'projects', component: ProjectsComponent },
    { 
      path: 'projects/add', 
      canDeactivate: [ProjectsGuardGuard],
      component: ProjectEditComponent
    },
    { 
      path: 'projects/:id', 
      canDeactivate: [ProjectsGuardGuard],
      component: ProjectEditComponent,
      resolve: { projectData: ProjectResolverResolver }
    },
    { path: '**', redirectTo: 'projects', pathMatch: 'full' }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }