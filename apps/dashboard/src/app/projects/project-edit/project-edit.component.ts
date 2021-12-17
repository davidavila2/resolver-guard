import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  loaded$: Observable<boolean> = this.projectsFacade.loaded$;
  isDirty = false;

  constructor(
    private projectsFacade: ProjectsFacade,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.isDirty = this.form.dirty;

    this.route.data.subscribe((data) => {
    if (data['projectData'] !== undefined) {
      this.projectsFacade.selectProject(data['projectData'].id)
      this.projectsFacade.loadProject(data['projectData']);
      this.projectsFacade.selectedProject$.subscribe((project) => {
        this.form.patchValue({...project})
      })
    }
    })
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

    this.goBackToProjects()
  }

  goBackToProjects() {
    this.router.navigate(['/projects']);
  }

  private initForm() {
    this.form = this.formBuilder.group({
      id: null,
      title: ['', Validators.compose([Validators.required])],
      details: ['', Validators.compose([Validators.required])],
      importanceLevel: ['']
    });
  }
}
