import { Component, OnInit, signal, inject, effect, HostListener, ElementRef } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MarkdownService } from '../../../core/services/markdown.service';
import { RegulationBadge } from '../regulation-badge/regulation-badge';
import mermaid from 'mermaid';

mermaid.initialize({ startOnLoad: false, securityLevel: 'antiscript' });

@Component({
  selector: 'app-topic-page',
  imports: [RegulationBadge],
  templateUrl: './topic-page.html',
})
export class TopicPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly markdownService = inject(MarkdownService);
  private readonly elementRef = inject(ElementRef);
  private readonly sanitizer = inject(DomSanitizer);

  readonly content = signal<SafeHtml | null>(null);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly regulationIds = signal<string[]>([]);
  readonly focusedDiagram = signal<SafeHtml | null>(null);

  constructor() {
    effect(() => {
      if (this.content()) {
        setTimeout(() => {
          mermaid
            .run({ nodes: document.querySelectorAll('pre.mermaid:not([data-processed])') })
            .then(() => this.wrapMermaidDiagrams());
        }, 0);
      }
    });
  }

  private wrapMermaidDiagrams(): void {
    const host = this.elementRef.nativeElement as HTMLElement;
    host.querySelectorAll<HTMLElement>('pre.mermaid:not([data-mermaid-wrapped])').forEach((pre) => {
      if (!pre.parentNode) return;
      pre.setAttribute('data-mermaid-wrapped', 'true');

      const wrapper = document.createElement('div');
      wrapper.className = 'mermaid-wrapper not-prose';

      const bar = document.createElement('div');
      bar.className = 'mermaid-bar';
      bar.innerHTML = `
        <span class="mermaid-bar-label">Diagrama</span>
        <button class="mermaid-expand-btn" aria-label="Ampliar diagrama">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 3 21 3 21 9"></polyline>
            <polyline points="9 21 3 21 3 15"></polyline>
            <line x1="21" y1="3" x2="14" y2="10"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
        </button>
      `;

      pre.parentNode!.insertBefore(wrapper, pre);
      wrapper.appendChild(bar);
      wrapper.appendChild(pre);
    });
  }

  /** Event-delegation: single listener on the host captures clicks on any diagram or its bar. */
  @HostListener('click', ['$event'])
  onHostClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    // Intercept clicks on internal relative links rendered from markdown so that
    // they navigate relative to the current route instead of the site root.
    // E.g. clicking `[CDB](cdb)` from `/renda-fixa` should go to `/renda-fixa/cdb`,
    // not `/cdb`. External links, absolute paths and pure in-page anchors are
    // left to the browser's default handling.
    const anchor = target.closest<HTMLAnchorElement>('a[href]');
    if (anchor && this.tryNavigateRelative(anchor, event)) {
      return;
    }

    const pre = target.closest<HTMLElement>('pre.mermaid');
    const bar = target.closest<HTMLElement>('.mermaid-bar');

    const mermaidPre =
      pre ?? bar?.closest<HTMLElement>('.mermaid-wrapper')?.querySelector<HTMLElement>('pre.mermaid');

    if (mermaidPre) {
      const svg = mermaidPre.querySelector('svg');
      if (svg) {
        this.openDiagram(svg as SVGElement);
      }
    }
  }

  /**
   * Routes a relative anchor through the Angular Router using the current
   * ActivatedRoute as the base. Returns true when navigation was handled.
   */
  private tryNavigateRelative(anchor: HTMLAnchorElement, event: MouseEvent): boolean {
    // Respect modifier keys / non-primary buttons so users can still open
    // links in a new tab / window.
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
      return false;
    }
    if (anchor.target && anchor.target !== '' && anchor.target !== '_self') {
      return false;
    }

    const rawHref = anchor.getAttribute('href');
    if (!rawHref) return false;

    // Skip external schemes, protocol-relative URLs, absolute paths and
    // pure in-page anchors. Everything else is treated as a relative route.
    if (
      rawHref.startsWith('#') ||
      rawHref.startsWith('/') ||
      rawHref.startsWith('mailto:') ||
      rawHref.startsWith('tel:') ||
      /^[a-z][a-z0-9+.-]*:\/\//i.test(rawHref)
    ) {
      return false;
    }

    const [pathAndQuery, fragment] = rawHref.split('#');
    const [path, query] = pathAndQuery.split('?');
    const segments = path.split('/').filter((s) => s.length > 0);
    if (segments.length === 0) return false;

    const queryParams = query
      ? Object.fromEntries(new URLSearchParams(query).entries())
      : undefined;

    event.preventDefault();
    this.router.navigate(segments, {
      relativeTo: this.route,
      queryParams,
      fragment: fragment || undefined,
    });
    return true;
  }

  openDiagram(svg: SVGElement): void {
    this.focusedDiagram.set(this.sanitizer.bypassSecurityTrustHtml(svg.outerHTML));
    // Move focus to the close button once the modal is rendered
    setTimeout(() => {
      (this.elementRef.nativeElement as HTMLElement)
        .querySelector<HTMLButtonElement>('.mermaid-modal-close')
        ?.focus();
    }, 0);
  }

  closeFocusedDiagram(): void {
    this.focusedDiagram.set(null);
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.focusedDiagram()) {
      this.closeFocusedDiagram();
    }
  }

  ngOnInit() {
    const data = this.route.snapshot.data;
    this.regulationIds.set(data['regulationIds'] ?? []);

    this.markdownService.load(data['assetPath']).subscribe({
      next: (html) => {
        this.content.set(html);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }
}
