import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Experience } from 'src/app/models/experience';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/services/toast.service';

const DUMMY_WORK_EXPERIENCE = [
  {
    company: 'Company 1',
    role: 'Role 1',
    duration: 'Duration 1',
    summary: 'Summary 1',
    tasks: [
      'A really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really long task',
      'Task 2',
      'Task 3',
    ],
    _id: 'SERVER ID 1'
  },
  {
    company: 'Company 2',
    role: 'Role 2',
    duration: 'Duration 2',
    summary: 'Summary 2',
    tasks: [
      'Task 1',
    ],
    _id: 'SERVER ID 2'
  },
  {
    company: 'Company 3',
    role: 'Role 3',
    duration: 'Duration 3',
    summary: 'Summary 3',
    tasks: [
      'Task 1',
      'Task 2',
    ],
    _id: 'SERVER ID 3'
  }
];

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: [
    '../shared/styles.scss',
    './experience.component.scss'
  ]
})
export class ExperienceComponent implements OnInit {
  isAddingNewExperience = false;

  isEditingExistingExperience = false;
  experienceUnderEdit: Experience = null;

  isRemovingExperience = false;
  experienceBeingRemoved: string = null;

  confirmationButtonsDisabled = false;

  workExperience: Experience[] = [];

  constructor(private http: HttpClient,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.fetchExperience();
  }

  fetchExperience() {
    const url = environment.serverUrl + 'experience/get';
    this.http.get(url)
      .subscribe((response: { content: Experience[] }) => {
        this.workExperience = response.content;
      });
  }

  editExistingExperience(index: number) {
    this.isEditingExistingExperience = true;
    this.experienceUnderEdit = this.workExperience[index];
    this.openModal();
  }

  onCrossClick(id: string) {
    this.isRemovingExperience = true;
    this.experienceBeingRemoved = id;
  }

  denyExperienceRemoval() {
    this.isRemovingExperience = false;
    this.experienceBeingRemoved = null;
  }

  confirmRemoveExperience() {
    if (this.confirmationButtonsDisabled) {
      return;
    }
    this.confirmationButtonsDisabled = true;

    const url = environment.serverUrl + 'experience/remove';
    this.http.post(url, {
      entryId: this.experienceBeingRemoved
    })
      .subscribe((response: { message: string }) => {
        this.toastService.broadcast(response.message, 'SUCCESS');
        this.fetchExperience();
      }, error => {
        this.toastService.broadcast(error.error.message, 'ERROR');
      }, () => {
        this.confirmationButtonsDisabled = false;
        this.isRemovingExperience = false;
        this.experienceBeingRemoved = null;
      });
  }

  openModal() {
    this.isAddingNewExperience = true;
  }

  closeModal() {
    this.fetchExperience();
    this.isAddingNewExperience = false;
    this.isEditingExistingExperience = false;
    this.experienceUnderEdit = null;
  }

}
