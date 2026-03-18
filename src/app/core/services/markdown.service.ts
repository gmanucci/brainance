import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { marked } from 'marked';

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
        const html = marked.parse(md) as string;
        return this.sanitizer.bypassSecurityTrustHtml(html);
      })
    );
  }
}
