import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from './project';

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

  getUrlWithId(id: string): string {
    return `${this.getUrl()}/${id}`
  }

  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.getUrl());
  }

  getOneProject(id: string): Observable<Project> {
    return this.httpClient.get<Project>(this.getUrlWithId(id))
  }

  createProject(project: Project): Observable<Project> {
    return this.httpClient.post<Project>(this.getUrl(), project);
  }

  updateProject(project: Project): Observable<Project> {
    return this.httpClient.patch<Project>(this.getUrlWithId(project.id), project)
  }

  deleteProject(id: string): Observable<Project> {
    return this.httpClient.delete<Project>(this.getUrlWithId(id))
  }
}
