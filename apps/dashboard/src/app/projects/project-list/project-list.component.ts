import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from '@resolver-guard/core-data';

@Component({
  selector: 'resolver-guard-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {
  @Input() projects!: Project[] | null;
  @Input() loaded = false;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
