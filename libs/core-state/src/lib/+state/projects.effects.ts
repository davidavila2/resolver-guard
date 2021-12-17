import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence, fetch, pessimisticUpdate } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import { Project, ProjectsService } from '@resolver-guard/core-data';
import * as ProjectsActions from './projects.actions';
import { ProjectsPartialState } from './projects.reducer';

@Injectable()
export class ProjectsEffects {
  loadProject$ = createEffect(() => this.actions$.pipe(
    ofType(ProjectsActions.loadProject),
    fetch({
      run: (action) => {
        this.projectsService
          .getOneProject(action.project.id)
          .pipe(
            map((project: Project) =>
              ProjectsActions.loadProjectSuccess({ project })
            )
          )
      },
      onError: (action, error) => console.log(error)
    })
  ));

  loadProjects$ = createEffect(() => this.actions$.pipe(
    ofType(ProjectsActions.loadProjects),
    fetch({
      run: () =>
        this.projectsService
          .getProjects()
          .pipe(
            map((projects: Project[]) =>
              ProjectsActions.loadProjectsSuccess({ projects })
            )
          ),
      onError: (action, error) => console.log(error)
    })
  ));

  createProject$ = createEffect(() => this.actions$.pipe(
    ofType(ProjectsActions.createProject),
    pessimisticUpdate({
      run: (action) => this.projectsService.createProject(action.project).pipe(
        map((project: Project) =>
          ProjectsActions.createProjectSuccess({ project })
        )
      ),
      onError: (action, error) => console.log(error)
    })
  ));

  updateProject$ = createEffect(() => this.actions$.pipe(
    ofType(ProjectsActions.updateProject),
    pessimisticUpdate({
      run: (action) => this.projectsService.updateProject(action.project).pipe(
        map((project: Project) =>
          ProjectsActions.updateProjectSuccess({ project })
        )
      ),
      onError: (action, error) => console.log(error)
    })
  ));

  deleteProject$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(ProjectsActions.deleteProject, {
      run: (
        action: ReturnType<typeof ProjectsActions.deleteProject>
      ) => {
        return this.projectsService.deleteProject(action.project.id).pipe(
          map(() => ProjectsActions.deleteProjectSuccess({ project: action.project }))
        )
      },
      onError: (action: ReturnType<typeof ProjectsActions.deleteProject>, error) => console.log(error)
    })
  );

  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService,
    private dataPersistence: DataPersistence<ProjectsPartialState>
    ) {}
}
