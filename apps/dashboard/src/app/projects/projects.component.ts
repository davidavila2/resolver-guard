import { Component, OnInit } from '@angular/core';
import { Project } from '@resolver-guard/core-data';
import { ProjectsFacade } from '@resolver-guard/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'resolver-guard-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  selectedProject$ = this.projectsFacade.selectedProject$;
  loaded$ = this.projectsFacade.loaded$;
  projects$: Observable<Project[]> = this.projectsFacade.allProjects$;

  constructor(
    private projectsFacade: ProjectsFacade
  ) { }

  ngOnInit(): void {
    this.projectsFacade.loadProjects();
    this.projectsFacade.selectProject('');

    this.projectsFacade.mutations$.subscribe(() => this.projectsFacade.loadProjects());
  }

  selectProject(project: Project): void {
    this.projectsFacade.selectProject(project.id);
  }

  delete(project: Project): void {
    this.projectsFacade.deleteProject(project);
  }
}
