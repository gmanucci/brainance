import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Marked } from 'marked';

export interface MarkdownResult {
  html: SafeHtml;
  hasMermaid: boolean;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

@Injectable({ providedIn: 'root' })
export class MarkdownService {
  private readonly http = inject(HttpClient);
  private readonly sanitizer = inject(DomSanitizer);

  /**
   * Fetches a markdown file from assets and returns it as trusted SafeHtml.
   * Input is restricted to known asset paths — never user-provided content.
   * Mermaid code blocks (```mermaid) are rendered as <pre class="mermaid"> containers.
   */
  load(assetPath: string): Observable<MarkdownResult> {
    return this.http.get(assetPath, { responseType: 'text' }).pipe(
      map((md) => {
        let hasMermaid = false;

        const markedInstance = new Marked({
          renderer: {
            code({ text, lang }) {
              if (lang === 'mermaid') {
                hasMermaid = true;
                return `<pre class="mermaid">${escapeHtml(text)}</pre>`;
              }
              return false;
            },
          },
        });

        const html = markedInstance.parse(md) as string;
        return {
          html: this.sanitizer.bypassSecurityTrustHtml(html),
          hasMermaid,
        };
      })
    );
  }
}
