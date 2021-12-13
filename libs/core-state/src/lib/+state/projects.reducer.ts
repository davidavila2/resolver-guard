import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import { Project } from '@resolver-guard/core-data';
import * as ProjectsActions from './projects.actions';

export const PROJECTS_FEATURE_KEY = 'projects';

export interface State extends EntityState<Project> {
  selectedId?: string | number; // which Projects record has been selected
  loaded: boolean; // has the Projects list been loaded
  error?: string | null; // last known error (if any)
  projects: Project[];
}

export interface ProjectsPartialState {
  readonly [PROJECTS_FEATURE_KEY]: State;
}

export const projectsAdapter: EntityAdapter<Project> =
  createEntityAdapter<Project>();

const onFailure = (state: State, { error }: any) => ({ ...state, error });

export const initialState: State = projectsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  error: null,
  projects: []
});

const projectsReducer = createReducer(
  initialState,
  on(ProjectsActions.selectProject, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  // on(ProjectsActions.resetSelectedProject, (state) =>
  //   Object.assign({}, state, { selectedId: null })
  // ),
  on(ProjectsActions.resetProjects, (state) =>
    projectsAdapter.removeAll(state)
  ),
  on(
    ProjectsActions.loadProject,
    ProjectsActions.loadProjects,
    ProjectsActions.createProject,
    ProjectsActions.updateProject,
    ProjectsActions.deleteProject,
    (state) => ({
      ...state,
      loaded: false,
      error: null,
    })),
  on(ProjectsActions.loadProjectSuccess, (state, { project }) =>
    projectsAdapter.addOne(project, { ...state, loaded: true })
  ),
  on(ProjectsActions.loadProjectsSuccess, (state, { projects }) =>
    projectsAdapter.setAll(projects, { ...state, loaded: true })
  ),
  on(ProjectsActions.createProjectSuccess, (state, { project }) =>
    projectsAdapter.addOne(project, state)
  ),
  on(ProjectsActions.updateProjectSuccess, (state, { project }) =>
    projectsAdapter.updateOne({ id: project.id, changes: project }, state)
  ),
  on(ProjectsActions.deleteProjectSuccess, (state, { project }) =>
    projectsAdapter.removeOne(project.id, { ...state, isLoading: false })
  ),
  on(ProjectsActions.loadProjectFailure, onFailure),
  on(ProjectsActions.loadProjectsFailure, onFailure),
  on(ProjectsActions.createProjectFailure, onFailure),
  on(ProjectsActions.updateProjectFailure, onFailure),
  on(ProjectsActions.deleteProjectFailure, onFailure)
);

export function reducer(state: State | undefined, action: Action) {
  return projectsReducer(state, action);
}
