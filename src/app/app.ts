import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './components/ui/button/button';
import { AlertComponent } from './components/ui/alert/alert';
import { CardComponent } from './components/ui/card/card';
import { BadgeComponent } from './components/ui/badge/badge';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonComponent, AlertComponent, CardComponent, BadgeComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = 'Brainance';
}
