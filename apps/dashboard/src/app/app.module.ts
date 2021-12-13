import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@resolver-guard/material';
import { CoreDataModule } from '@resolver-guard/core-data';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, ProjectsComponent, ProjectListComponent, ProjectEditComponent],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    MaterialModule,
    CoreDataModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
