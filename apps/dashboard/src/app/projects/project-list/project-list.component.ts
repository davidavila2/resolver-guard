import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '@resolver-guard/core-data';

@Component({
  selector: 'resolver-guard-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {
  @Input() projects!: Project[] | null;
  @Input() loaded!: boolean | null
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();

  constructor(private router: Router) {}

  add() {
    this.router.navigateByUrl('projects/add');
  }
}
