import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  @Output() addNewDocument = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onAddButtonClick() {
    this.addNewDocument.emit();
  }
}
