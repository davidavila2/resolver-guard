/* eslint-disable @typescript-eslint/no-empty-function */
import { of } from 'rxjs';

export class ProjectFacadeStub {
  get loaded$() {
    return of(null);
  }

  get allProjects$() {
    return of(null);
  }

  get selectedProject$() {
    return of({
      id: 3,
      title: 'project 3',
      details: 'this is project 3',
      importanceLevel: 50
    });
  }

  get mutations$() {
    return of(null);
  }

  backToProjectsClicked() { }

  selectProject() { }

  loadProjects() { }

  loadProject() { }

  createProject() { }

  updateProject() { }

  deleteProject() { }

  dispatch() { }
}