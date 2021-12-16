import { Injectable } from '@angular/core';
import { select, Store, ActionsSubject,  Action } from '@ngrx/store';
import { Project } from '@resolver-guard/core-data';
import { filter } from 'rxjs';

import * as ProjectsActions from './projects.actions';
import * as ProjectsSelectors from './projects.selectors';
import * as fromProjects from './projects.reducer';

@Injectable()
export class ProjectsFacade {
  loaded$ = this.store.pipe(select(ProjectsSelectors.getProjectsLoaded));
  allProjects$ = this.store.pipe(select(ProjectsSelectors.getAllProjects));
  selectedProject$ = this.store.pipe(select(ProjectsSelectors.getSelected));
  mutations$ = this.actions$.pipe(
    filter(
      (action: Action) =>
        action.type === ProjectsActions.createProject({} as any).type ||
        action.type === ProjectsActions.updateProject({} as any).type ||
        action.type === ProjectsActions.deleteProject({} as any).type
    )
  );

  constructor(
    private store: Store<fromProjects.ProjectsPartialState>,
    private actions$: ActionsSubject
  ) { }

  selectProject(selectedId: string | null) {
    this.dispatch(ProjectsActions.selectProject({ selectedId }));
  }

  loadProjects() {
    this.dispatch(ProjectsActions.loadProjects());
  }

  loadProject(project: Project) {
    this.dispatch(ProjectsActions.loadProject({ project }));
  }

  createProject(project: Project) {
    this.dispatch(ProjectsActions.createProject({ project }));
  }

  updateProject(project: Project) {
    this.dispatch(ProjectsActions.updateProject({ project }));
  }

  deleteProject(project: Project) {
    this.dispatch(ProjectsActions.deleteProject({ project }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
