import { createAction, props } from '@ngrx/store';
import { Project } from '@resolver-guard/core-data';

export const resetProjects = createAction('[Projects] Reset Projects');

// Select Project
export const selectProject = createAction(
  '[Projects] Select Project',
  props<{ selectedId: string | null }>()
);

// Load Projects
export const loadProjects = createAction('[Projects] Load Projects');

export const loadProjectsSuccess = createAction(
  '[Projects] Load Projects Success',
  props<{ projects: Project[] }>()
);

export const loadProjectsFailure = createAction(
  '[Projects] Load Projects Failure',
  props<{ error: string }>()
);

// Load Project
export const loadProject = createAction(
  '[Projects] Load Project',
  props<{ projectId: string | null }>()
);

export const loadProjectSuccess = createAction(
  '[Projects] Load Project Success',
  props<{ project: Project }>()
);

export const loadProjectFailure = createAction(
  '[Projects] Load Project Failure',
  props<{ error: string }>()
);

// Create Project
export const createProject = createAction(
  '[Projects] Create Project',
  props<{ project: Project }>()
);

export const createProjectSuccess = createAction(
  '[Projects] Create Project Success',
  props<{ project: Project }>()
);

export const createProjectFailure = createAction(
  '[Projects] Create Project Failure',
  props<{ error: string }>()
);

// Update Project
export const updateProject = createAction(
  '[Projects] Update Project',
  props<{ project: Project }>()
);

export const updateProjectSuccess = createAction(
  '[Projects] Update Project Success',
  props<{ project: Project }>()
);

export const updateProjectFailure = createAction(
  '[Projects] Update Project Failure',
  props<{ error: string }>()
);

// Delete Project
export const deleteProject = createAction(
  '[Projects] Delete Project',
  props<{ project: Project }>()
);

export const deleteProjectCancelled = createAction(
  '[Projects] Delete Project Cancelled'
);

export const deleteProjectSuccess = createAction(
  '[Projects] Delete Project Success',
  props<{ project: Project }>()
);

export const deleteProjectFailure = createAction(
  '[Projects] Delete Project Failure',
  props<{ error: string }>()
);