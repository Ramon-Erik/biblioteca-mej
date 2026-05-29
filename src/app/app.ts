import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/layout/header/header';
import { Menu } from './shared/layout/header/components/menu/menu';
import { Footer } from './shared/layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Menu, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('biblioteca-mej');
}
