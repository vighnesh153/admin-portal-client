import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Project } from 'src/app/models/project';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

const DUMMY_PROJECTS = [
  {
    _id: 'DUMMY_ID',
    clientId: 'canvas',
    title: 'Canvas API',
    routeLink: '/projects/canvas',
    isLinkAbsolute: false,
    description: 'Manipulation of the graphics using the Canvas API in Javascript',
    items: [
      {
        title: 'Fractals',
        description: 'Fractals are shapes that have fractional dimensions',
        link: 'https://vighnesh153-canvas.github.io/fractals'
      },
      {
        title: 'Algorithms Visualizer',
        description: 'I attempt to visualize some of the algorithms that, may or may not be the most efficient ones, ' +
          'in terms of time and/or space complexity, but are important and fun to understand how they work.',
        link: 'https://vighnesh153-canvas.github.io/algorithms-visualizer'
      },
    ]
  }
];

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: [
    '../shared/styles.scss',
    './projects.component.scss',
  ]
})
export class ProjectsComponent implements OnInit {
  isAddingNewProject = false;

  isEditingExistingProject = false;
  projectUnderEdit: Project = null;

  isRemovingProject = false;
  projectBeingRemoved: string = null;

  confirmationButtonsDisabled = false;

  projects: Project[] = [];

  constructor(private http: HttpClient,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    // this.projects = DUMMY_PROJECTS;
    this.fetchProjects();
  }

  fetchProjects() {
    // return;
    const url = environment.serverUrl + 'projects/get';
    this.http.get(url)
      .subscribe((response: { content: Project[] }) => {
        this.projects = response.content;
      });
  }

  editExistingProject(index: number) {
    this.isEditingExistingProject = true;
    this.projectUnderEdit = this.projects[index];
    this.openModal();
  }

  onCrossClick(id: string) {
    this.isRemovingProject = true;
    this.projectBeingRemoved = id;
  }

  denyProjectRemoval() {
    this.isRemovingProject = false;
    this.projectBeingRemoved = null;
  }

  confirmRemoveProject() {
    if (this.confirmationButtonsDisabled) {
      return;
    }
    this.confirmationButtonsDisabled = true;

    const url = environment.serverUrl + 'projects/remove';
    this.http.post(url, {
      entryId: this.projectBeingRemoved
    })
      .subscribe((response: { message: string }) => {
        this.toastService.broadcast(response.message, 'SUCCESS');
        this.fetchProjects();
      }, error => {
        this.toastService.broadcast(error.error.message, 'ERROR');
      }, () => {
        this.confirmationButtonsDisabled = false;
        this.isRemovingProject = false;
        this.projectBeingRemoved = null;
      });
  }

  openModal() {
    this.isAddingNewProject = true;
  }

  closeModal() {
    this.fetchProjects();
    this.isAddingNewProject = false;
    this.isEditingExistingProject = false;
    this.projectUnderEdit = null;
  }

}
