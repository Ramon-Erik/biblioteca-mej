import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button-default',
  imports: [NgClass],
  templateUrl: './button-default.html',
  styleUrl: './button-default.scss',
})
export class ButtonDefault {
  @Input() title = '';
  @Input() disable = false;
}
