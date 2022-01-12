import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { emptyProject, Project } from './project';

const BASE_URL = 'https://server-30-x-30.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  model = 'projects';

  constructor(private httpClient: HttpClient) { }

  getUrl(): string {
    return `${BASE_URL}${this.model}`;
  }

  getUrlWithId(id: string | null): string {
    return `${this.getUrl()}/${id}`
  }

  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.getUrl());
  }

  getOneProject(id: string | null): Observable<Project> {
    if (id === '0' || 0) {
      return of(this.initializeProject())
    };
    return this.httpClient.get<Project>(this.getUrlWithId(id))
  }

  createProject(project: Project): Observable<Project> {
    return this.httpClient.post<Project>(this.getUrl(), project);
  }

  updateProject(project: Project): Observable<Project> {
    return this.httpClient.patch<Project>(this.getUrlWithId(project.id), project)
  }

  deleteProject(project: Project): Observable<Project> {
    return this.httpClient.delete<Project>(this.getUrlWithId(project.id))
  }

  private initializeProject(): Project {
    return {
      ...emptyProject,
    }
  }
}
