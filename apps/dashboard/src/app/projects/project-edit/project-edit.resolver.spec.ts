import { TestBed } from '@angular/core/testing';
import { ProjectFacadeStub, ProjectsFacade } from '@resolver-guard/core-state';
import { ProjectEditResolver } from './project-edit.resolver';

describe('ProjectEditResolver', () => {
  let resolver: ProjectEditResolver;
  let projectsFacade: ProjectsFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ProjectsFacade,
          useClass: ProjectFacadeStub
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    resolver = TestBed.inject(ProjectEditResolver);
    projectsFacade = TestBed.inject(ProjectsFacade);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should resolve', () => {
    projectsFacade.selectProject('3');

    resolver.resolve().subscribe((res) => {
      expect(res).toStrictEqual({
        id: 3,
        title: 'project 3',
        details: 'this is project 3',
        importanceLevel: 50
      });
    });
  });
});