import { Component, input, OnInit, signal, inject } from '@angular/core';
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

  readonly content = signal<SafeHtml | null>(null);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly regulationIds = signal<string[]>([]);

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
