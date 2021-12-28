import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectEditComponent } from './project-edit.component';

@Injectable({
  providedIn: 'root'
})
export class ProjectsGuardGuard implements CanDeactivate<ProjectEditComponent> {
  canDeactivate(
    component: ProjectEditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!component.isDirty) {
        return confirm('navigate away and lose all changes made')
      }
      return true;
  }
}
