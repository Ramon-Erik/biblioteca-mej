import { Component, input, output } from '@angular/core';
import { BlurOnClick } from '@shared/directives/blur-on-click';

@Component({
  selector: 'app-min-button',
  imports: [BlurOnClick],
  templateUrl: './min-button.html',
  styleUrl: './min-button.scss',
})
export class MinButton {
  color = input<string>('var(--bg-btn-add)');

  // (ex: '2.5rem', '40px')
  size = input<string>('1.9rem');

  btnClick = output<void>();

  onClick(): void {
    this.btnClick.emit();
  }
}
