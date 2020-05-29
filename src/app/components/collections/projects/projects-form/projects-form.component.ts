import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { HttpClient } from '@angular/common/http';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-projects-form',
  templateUrl: './projects-form.component.html',
  styleUrls: [
    './projects-form.component.scss',
    '../../shared/form.scss'
  ]
})
export class ProjectsFormComponent implements OnInit {
  private formBuilder = new FormBuilder();

  formGroup: FormGroup;
  itemsRef: FormArray;

  isFormInSubmitState = false;

  @Input() isEdit = false;
  @Input() project: Project = null;

  @Output() closeForm = new EventEmitter();

  constructor(private http: HttpClient,
              private toastService: ToastService) { }

  ngOnInit(): void {
    const { isEdit, project } = this;

    this.formGroup = new FormGroup({
      clientId: new FormControl(
        isEdit ? project.clientId : null,
        Validators.required
      ),
      title: new FormControl(
        isEdit ? project.title : null,
        Validators.required
      ),
      routeLink: new FormControl(
        isEdit ? project.routeLink : null,
        Validators.required
      ),
      isLinkAbsolute: new FormControl(
        isEdit ? project.isLinkAbsolute : null
      ),
      description: new FormControl(
        isEdit ? project.description : null,
        Validators.required
      ),
      items: this.formBuilder.array([])
    });

    this.itemsRef = this.formGroup.get('items') as FormArray;

    if (isEdit) {
      for (const item of project.items) {
        const formGroup = this.addSubProjectFormGroup(item.title, item.description, item.link);
        this.itemsRef.push(formGroup);
      }
    }
  }

  private addSubProjectFormGroup(title: string= null,
                                 description: string = null,
                                 link: string = null): FormGroup {
    return this.formBuilder.group({
      title: new FormControl(title, Validators.required),
      description: new FormControl(description, Validators.required),
      link: new FormControl(link, Validators.required),
    });
  }

  onAddProject() {
    this.itemsRef.push(this.addSubProjectFormGroup());
  }

  onRemoveProject(index: number) {
    this.itemsRef.removeAt(index);
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

    const project = this.buildProject();
    const url = environment.serverUrl + 'projects/';
    (this.isEdit
        ? this.http.put(url + 'update', project)
        : this.http.post(url + 'create', project)
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

  buildProject(): Project {
    const project: Project = {
      clientId: this.formGroup.get('clientId').value,
      title: this.formGroup.get('title').value,
      routeLink: this.formGroup.get('routeLink').value,
      isLinkAbsolute: !!this.formGroup.get('isLinkAbsolute').value,
      description: this.formGroup.get('description').value,
      items: [],
      _id: 'Some Id'
    };

    for (const itemGroup of this.itemsRef.controls) {
      project.items.push({
        title: itemGroup.get('title').value,
        description: itemGroup.get('description').value,
        link: itemGroup.get('link').value,
      });
    }

    if (this.isEdit) {
      project._id = this.project._id;
    }

    return project;
  }

  autoResizeTextarea(event: Event) {
    const element: HTMLTextAreaElement = event.target as HTMLTextAreaElement;
    element.style.overflow = 'hidden';
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 3 + 'px';
  }

}
