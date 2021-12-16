import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import * as fromProjects from '@resolver-guard/core-state';
import { Store } from '@ngrx/store';
import { Project, ProjectsService } from '@resolver-guard/core-data';
import { ProjectsFacade } from '@resolver-guard/core-state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectResolverResolver implements Resolve<Observable<Project | undefined>> {
  constructor(private projectsFacade: ProjectsFacade, private projectsService: ProjectsService, private store: Store<fromProjects.ProjectsPartialState>) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Project | undefined> {
    const id = route.paramMap.get('id') || null;
    
    this.projectsFacade.selectProject(id);

    return this.projectsFacade.selectedProject$
  }
}
