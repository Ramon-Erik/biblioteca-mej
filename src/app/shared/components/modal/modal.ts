import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  isOpen = input.required<boolean>();

  // Evento disparado ao clicar no X, no botão fechar ou fora do modal
  closeModal = output<void>();

  onClose(): void {
    this.closeModal.emit();
  }
}
