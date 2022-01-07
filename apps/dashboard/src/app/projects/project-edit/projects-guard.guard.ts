import { Injectable } from '@angular/core';
import { CanDeactivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectEditComponent } from './project-edit.component';

@Injectable({
  providedIn: 'root'
})
export class ProjectsGuard implements CanDeactivate<ProjectEditComponent> {
  canDeactivate(
    component: ProjectEditComponent): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(component.isDirty) {
        return confirm('There are unsaved changes to your project. Are you sure you want to leave this page?');
      };
      return true;
  }
}
