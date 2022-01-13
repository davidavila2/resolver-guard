import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectsFacade, ProjectFacadeStub } from '@resolver-guard/core-state';
import { ProjectEditComponent } from './project-edit.component';
import { ProjectsGuard } from './project-edit.guard'
import { MaterialModule } from '@resolver-guard/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Project Edit Guard', () => {
  let guard: ProjectsGuard;
  let component: ProjectEditComponent;
  let fixture: ComponentFixture<ProjectEditComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectEditComponent ],
      imports: [ FormsModule, ReactiveFormsModule, RouterTestingModule, MaterialModule, BrowserAnimationsModule ],
      providers: [
        {
          provide: ProjectsFacade,
          useClass: ProjectFacadeStub
        },
        { provide: FormBuilder, useValue: formBuilder }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditComponent);
    component = fixture.componentInstance;
    guard = TestBed.inject(ProjectsGuard);
    component.form = formBuilder.group({
      id: null,
      title: '',
      description: '',
      importanceLevel: null
    });
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should deactivate', () => {
    component.form.dirty;

    expect(component.form.dirty).toBe(false);
  });

  it('should not deactivate', () => {
    const title = component.form.get('title')
    component.form.dirty;

    component.form.patchValue({
      title:"project 3",
    });

    title?.markAsDirty()

    expect(component.form.dirty).toBe(true)
  });
});