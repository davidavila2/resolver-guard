import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Project, ProjectsService } from '@resolver-guard/core-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectEditResolver implements Resolve<Observable<Project | undefined>> {
  constructor(private projectsService: ProjectsService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Project | undefined> {
    const id = route.paramMap.get('id') || null;
    return this.projectsService.getOneProject(id);
  }
}
