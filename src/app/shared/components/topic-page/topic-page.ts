import { Component, OnInit, signal, inject, Injector, afterNextRender } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MarkdownService } from '../../../core/services/markdown.service';
import { RegulationBadge } from '../regulation-badge/regulation-badge';

@Component({
  selector: 'app-topic-page',
  imports: [RegulationBadge],
  templateUrl: './topic-page.html',
})
export class TopicPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly markdownService = inject(MarkdownService);
  private readonly injector = inject(Injector);

  readonly content = signal<SafeHtml | null>(null);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly regulationIds = signal<string[]>([]);

  ngOnInit() {
    const data = this.route.snapshot.data;
    this.regulationIds.set(data['regulationIds'] ?? []);

    this.markdownService.load(data['assetPath']).subscribe({
      next: ({ html, hasMermaid }) => {
        this.content.set(html);
        this.loading.set(false);

        if (hasMermaid) {
          afterNextRender(
            () => {
              import('mermaid')
                .then(({ default: mermaid }) => {
                  mermaid.initialize({ startOnLoad: false });
                  mermaid.run();
                })
                .catch((err) => console.error('Failed to load mermaid:', err));
            },
            { injector: this.injector },
          );
        }
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }
}
