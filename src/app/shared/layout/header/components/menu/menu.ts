import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  public isOpen = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
