import { Injectable } from '@angular/core';

import { Toast, ToastType } from 'src/app/models/toast';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toastMessageSubject = new Subject<Toast>();

  constructor() { }

  broadcast(message: string, type: ToastType) {
    this.toastMessageSubject.next({ message, type });
  }
}
