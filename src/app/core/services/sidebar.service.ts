import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Tracks the open/closed state of the application sidebar.
 *
 * Persisted in localStorage so the layout choice survives reloads.
 * Used by both the navbar (toggle button) and the shell (main content margin)
 * and by the sidebar itself (slide in/out).
 */
@Injectable({ providedIn: 'root' })
export class SidebarService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'brainance-sidebar-open';

  readonly isOpen = signal<boolean>(this.getInitialState());

  constructor() {
    effect(() => {
      const open = this.isOpen();
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(this.storageKey, open ? '1' : '0');
      }
    });
  }

  toggle(): void {
    this.isOpen.update((v) => !v);
  }

  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }

  private getInitialState(): boolean {
    if (!isPlatformBrowser(this.platformId)) return true;
    const stored = localStorage.getItem(this.storageKey);
    if (stored === '0') return false;
    if (stored === '1') return true;
    // Default: open on desktop, closed on small screens
    return window.matchMedia('(min-width: 768px)').matches;
  }
}
