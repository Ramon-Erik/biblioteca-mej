import { Component } from '@angular/core';
import { PageTitle } from "@shared/components/page-title/page-title";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [PageTitle, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
