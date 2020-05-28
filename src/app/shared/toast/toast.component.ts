import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Toast } from 'src/app/models/toast';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  messages: {toast: Toast, id: number }[];
  toastMessageSubscription: Subscription;
  toastId: number;
  toastDurationInMs = 3 * 1000;

  constructor(private toastMessagesService: ToastService) {
    this.toastId = 0;
    this.messages = [];
    this.toastMessageSubscription =
      this.toastMessagesService.toastMessageSubject
        .subscribe(toast => {
          this.messages.push({ toast, id: this.toastId });

          const currentId = this.toastId;
          setTimeout(() => {
            this.messages = this.messages.filter(t => t.id !== currentId);
          }, this.toastDurationInMs);

          this.toastId++;
        });
  }

  ngOnInit(): void {
  }

}
