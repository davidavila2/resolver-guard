import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { map, tap } from 'rxjs/operators';

import { Project, ProjectsService } from '@resolver-guard/core-data';
import * as ProjectsActions from './projects.actions';
import { Router } from '@angular/router';

@Injectable()
export class ProjectsEffects {
  loadProject$ = createEffect(() => this.actions$.pipe(
    ofType(ProjectsActions.loadProject),
    fetch({
      run: (action) => {
        console.log('I should be calling the service now');
        return this.projectsService
          .getOneProject(action.projectId)
          .pipe(
            tap((project) => console.log(project, 'made it past the first action')),
            map((project: Project) =>
              ProjectsActions.loadProjectSuccess({ project })
            )
          )
      },
      onError: (action, error) => console.log(error)
    })
  ));

  selectProject$ = createEffect(() => this.actions$.pipe(
    ofType(ProjectsActions.selectProject),
    fetch({
      run: (action) =>  this.projectsService
      .getOneProject(action.selectedId).pipe(
        map((project: Project) => ProjectsActions.projectSelected({project}))
      ),
      onError: (action, error) => console.log(error)
    })
  ))

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

  deleteProject$ = createEffect(() => this.actions$.pipe(
    ofType(ProjectsActions.deleteProject),
    pessimisticUpdate({
      run: (action) => this.projectsService.deleteProject(action.project).pipe(
        map((project: Project) =>
          ProjectsActions.deleteProjectSuccess({ project })
        )
      ),
      onError: (action, error) => console.log(error)
    })
  ));

  routeOnSuccessfulAction$ = createEffect(() => this.actions$.pipe(
    ofType(ProjectsActions.createProjectSuccess, ProjectsActions.updateProjectSuccess, ProjectsActions.backToProjectsClicked),
    tap(() => this.router.navigate(['/projects']))
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService,
    private router: Router
    ) {}
}
