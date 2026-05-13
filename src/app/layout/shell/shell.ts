import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Sidebar } from '../sidebar/sidebar';
import { SidebarService } from '../../core/services/sidebar.service';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, Navbar, Sidebar],
  templateUrl: './shell.html',
})
export class Shell {
  readonly sidebarService = inject(SidebarService);
}
