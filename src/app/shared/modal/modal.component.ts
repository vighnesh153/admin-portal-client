import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Output() modalClose = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClickModal(event: Event) {
    event.stopPropagation();
  }

  onModalBackgroundClick() {
    this.modalClose.emit();
  }

}
