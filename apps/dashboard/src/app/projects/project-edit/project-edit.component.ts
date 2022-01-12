import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Project } from '@resolver-guard/core-data';
import { ProjectsFacade } from '@resolver-guard/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'resolver-guard-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  form!: FormGroup;
  selectedProject$: Observable<Project | undefined> = this.projectsFacade.selectedProject$;
  loaded$: Observable<boolean | null> = this.projectsFacade.loaded$;

  constructor(
    private projectsFacade: ProjectsFacade,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.data.subscribe((data: Data) => {
      const { projectData } = data;
      if (projectData !== undefined) {
        this.form.patchValue({...projectData});
      };
    });

    this.projectsFacade.mutations$.subscribe(() => this.resetProjects());
  }

  resetProjects(): void {
    this.form.reset();
  }

  create(): void {
    this.projectsFacade.createProject(this.form.value);
  }

  update(): void {
    this.projectsFacade.updateProject(this.form.value);
  }

  save(project: Project): void {
    project.id ? this.update() : this.create();
  }

  goBackToProjects(): void {
    this.projectsFacade.backToProjectsClicked()
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      id: null,
      title: ['', Validators.compose([Validators.required])],
      details: ['', Validators.compose([Validators.required])],
      importanceLevel: ['']
    });
  }
}
