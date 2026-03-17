import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAV_CONFIG } from '../../core/config/nav.config';
import { NavSection } from '../../core/models/nav.model';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  readonly navSections: NavSection[] = NAV_CONFIG;
  readonly openSections = signal<Set<string>>(new Set(NAV_CONFIG.map((s) => s.featureKey)));

  toggleSection(key: string) {
    this.openSections.update((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  isOpen(key: string) {
    return this.openSections().has(key);
  }

  parseQuery(path: string): Record<string, string> {
    const qs = path.split('?')[1] ?? '';
    return Object.fromEntries(new URLSearchParams(qs).entries());
  }
}
