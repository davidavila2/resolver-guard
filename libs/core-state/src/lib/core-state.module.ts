import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import * as fromProjects from './+state/projects.reducer';
import { ProjectsEffects } from './+state/projects.effects';
import { ProjectsFacade } from './+state/projects.facade';
import { DataPersistence } from '@nrwl/angular';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, name: 'Projects' }),
    StoreModule.forFeature(
      fromProjects.PROJECTS_FEATURE_KEY,
      fromProjects.reducer
    ),
    EffectsModule.forFeature([ProjectsEffects]),
  ],
  providers: [ProjectsFacade, DataPersistence],
})
export class CoreStateModule {}
