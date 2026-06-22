import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  isOpen = input.required<boolean>();

  closeModal = output<void>();

  onClose(): void {
    this.closeModal.emit();
  }
}
