import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { marked } from 'marked';

function escapeMermaidText(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

marked.use({
  renderer: {
    code({ text, lang }) {
      if (lang === 'mermaid') {
        return `<pre class="mermaid">${escapeMermaidText(text)}</pre>`;
      }
      return false;
    },
  },
});

@Injectable({ providedIn: 'root' })
export class MarkdownService {
  private readonly http = inject(HttpClient);
  private readonly sanitizer = inject(DomSanitizer);

  /**
   * Fetches a markdown file from assets and returns it as trusted SafeHtml.
   * Input is restricted to known asset paths — never user-provided content.
   */
  load(assetPath: string): Observable<SafeHtml> {
    return this.http.get(assetPath, { responseType: 'text' }).pipe(
      map((md) => {
        let html = marked.parse(md) as string;
        // Wrap every table in a horizontally scrollable container.
        // Markdown never produces nested <table> elements, so simple string
        // replacement is safe and avoids a full DOM-parse round-trip.
        html = html.replace(/<table/g, '<div class="table-wrapper"><table').replace(/<\/table>/g, '</table></div>');
        return this.sanitizer.bypassSecurityTrustHtml(html);
      })
    );
  }
}
