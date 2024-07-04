import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-model',
  templateUrl: './confirm-model.component.html',
  styleUrl: './confirm-model.component.css',
})
export class ConfirmModelComponent implements OnInit {
  @Input() isVisible!: boolean;
  @Input() message!: string;
  @Input() title!: string;
  @Input() confirmBtnText: string = 'Confirm';
  @Input() cancelBtnText: string = 'Cancel';

  @Output() cancel = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  delete() {
    this.confirm.emit(true);
    this.isVisible = false;
  }

  close() {
    this.isVisible = false;
    this.cancel.emit(false);
  }
}
