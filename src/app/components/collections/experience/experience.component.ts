import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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

  workExperience: Experience[] = [];

  newExperienceAddition: FormGroup;

  constructor(private http: HttpClient,
              private toastService: ToastService) {
    this.newExperienceAddition = new FormGroup({
      company: new FormControl(null, Validators.required),
      role: new FormControl(null, Validators.required),
      duration: new FormControl(null, Validators.required),
      summary: new FormControl(null, Validators.required),
      tasks: new FormArray([], Validators.required),
    });
  }

  ngOnInit(): void {
    // TODO: Remove the if else. Else block is always needed
    if (environment.production === false) {
      this.workExperience = DUMMY_WORK_EXPERIENCE;
    } else {
      const url = environment.serverUrl + 'experience/get';
      this.http.get(url)
        .subscribe((response: { content: Experience[] }) => {
          this.workExperience = response.content;
        });
    }
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

  confirmRemoveExperience() {
    // TODO
    throw new Error('Not implemented!');
  }

  openModal() {
    this.isAddingNewExperience = true;
  }

  closeModal() {
    this.isAddingNewExperience = false;
    this.isEditingExistingExperience = false;
    this.experienceUnderEdit = null;
  }

  denyExperienceRemoval() {
    this.isRemovingExperience = false;
    this.experienceBeingRemoved = null;
  }

}
