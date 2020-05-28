import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Experience } from 'src/app/models/experience';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: [
    './experience-form.component.scss',
    '../../shared/form.scss'
  ]
})
export class ExperienceFormComponent implements OnInit {
  formGroup: FormGroup;
  tasksRef: FormArray;

  isFormInSubmitState = false;

  @Input() isEdit = false;
  @Input() experience: Experience = null;

  @Output() closeForm = new EventEmitter();

  constructor(private http: HttpClient,
              private toastService: ToastService) { }

  ngOnInit(): void {
    const { isEdit, experience } = this;

    this.formGroup = new FormGroup({
      company: new FormControl(
        isEdit ? experience.company : null,
        Validators.required
      ),
      role: new FormControl(
        isEdit ? experience.role : null,
        Validators.required
      ),
      duration: new FormControl(
        isEdit ? experience.duration : null,
        Validators.required
      ),
      summary: new FormControl(
        isEdit ? experience.summary : null,
        Validators.required
      ),
      tasks: new FormArray(
        []
      ),
    });

    this.tasksRef = this.formGroup.get('tasks') as FormArray;

    if (isEdit) {
      for (const task of experience.tasks) {
        const formControl = new FormControl(task, Validators.required);
        this.tasksRef.push(formControl);
      }
    }
  }

  onAddTask() {
    const formControl = new FormControl(null, Validators.required);
    this.tasksRef.push(formControl);
  }

  onRemoveTask(index: number) {
    this.tasksRef.removeAt(index);
  }

  onFormSubmit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    if (this.isFormInSubmitState) {
      return;
    }
    this.isFormInSubmitState = true;

    const experience = this.buildExperience();
    const url = environment.serverUrl + 'experience/';
    (this.isEdit
      ? this.http.put(url + 'update', experience)
      : this.http.post(url + 'create', experience)
    ).subscribe((response: { message: string }) => {
      this.closeForm.emit();
      this.toastService.broadcast(response.message as string, 'SUCCESS');
    }, error => {
      this.closeForm.emit();
      this.toastService.broadcast(error.error.message, 'ERROR');
    });
  }

  onCloseForm() {
    this.closeForm.emit();
  }

  buildExperience(): Experience {
    const experience: Experience = {
      company: this.formGroup.get('company').value,
      role: this.formGroup.get('role').value,
      duration: this.formGroup.get('duration').value,
      summary: this.formGroup.get('summary').value,
      tasks: [],
      _id: 'Some Id'
    };

    for (const taskControl of this.tasksRef.controls) {
      experience.tasks.push(taskControl.value);
    }

    experience._id = this.isEdit ? this.experience._id : 'Some ID';

    return experience;
  }

  autoResizeTextarea(event: Event) {
    const element: HTMLTextAreaElement = event.target as HTMLTextAreaElement;
    element.style.overflow = 'hidden';
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 3 + 'px';
  }

}
