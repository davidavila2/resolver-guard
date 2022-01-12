import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Project } from '@resolver-guard/core-data';
import { ProjectsFacade } from '@resolver-guard/core-state';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectEditResolver implements Resolve<Observable<Project | undefined>> {
  constructor(
    private projectsFacade: ProjectsFacade
    ) {}

  resolve() {
    return this.projectsFacade.selectedProject$.pipe(
      take(1)
    );
  }
}