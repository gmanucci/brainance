import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NAV_CONFIG } from '../../core/config/nav.config';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
})
export class Home {
  readonly topics = NAV_CONFIG;
}
