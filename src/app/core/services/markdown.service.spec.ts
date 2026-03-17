import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { of, firstValueFrom } from 'rxjs';
import { MarkdownService } from './markdown.service';

describe('MarkdownService', () => {
  let service: MarkdownService;
  let httpClientSpy: { get: ReturnType<typeof vi.fn> };
  let bypassSecuritySpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    bypassSecuritySpy = vi.fn((html: string) => html);
    httpClientSpy = { get: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        MarkdownService,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: DomSanitizer, useValue: { bypassSecurityTrustHtml: bypassSecuritySpy } },
      ],
    });

    service = TestBed.inject(MarkdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return hasMermaid=false for markdown without mermaid blocks', async () => {
    const md = '# Hello\n\nSome regular content.\n\n```typescript\nconst x = 1;\n```\n';
    httpClientSpy.get.mockReturnValue(of(md));

    const result = await firstValueFrom(service.load('/assets/test.md'));

    expect(result.hasMermaid).toBe(false);
    expect(bypassSecuritySpy).toHaveBeenCalled();
  });

  it('should return hasMermaid=true for markdown with a mermaid code block', async () => {
    const md = '# Diagram\n\n```mermaid\ngraph TD\n  A --> B\n```\n';
    httpClientSpy.get.mockReturnValue(of(md));

    const result = await firstValueFrom(service.load('/assets/test.md'));

    expect(result.hasMermaid).toBe(true);
  });

  it('should render mermaid code blocks as <pre class="mermaid"> elements', async () => {
    const md = '```mermaid\nflowchart LR\n  A --> B\n```\n';
    httpClientSpy.get.mockReturnValue(of(md));

    await firstValueFrom(service.load('/assets/test.md'));

    const renderedHtml = bypassSecuritySpy.mock.calls[0][0] as string;
    expect(renderedHtml).toContain('<pre class="mermaid">');
    expect(renderedHtml).toContain('flowchart LR');
  });

  it('should render non-mermaid code blocks with standard <pre><code> markup', async () => {
    const md = '```javascript\nconsole.log("hello");\n```\n';
    httpClientSpy.get.mockReturnValue(of(md));

    await firstValueFrom(service.load('/assets/test.md'));

    const renderedHtml = bypassSecuritySpy.mock.calls[0][0] as string;
    expect(renderedHtml).toContain('<pre>');
    expect(renderedHtml).toContain('<code');
    expect(renderedHtml).not.toContain('class="mermaid"');
  });

  it('should HTML-escape special characters in mermaid diagram content', async () => {
    const md = '```mermaid\ngraph TD\n  A["<script>alert(1)</script>"] --> B\n```\n';
    httpClientSpy.get.mockReturnValue(of(md));

    await firstValueFrom(service.load('/assets/test.md'));

    const renderedHtml = bypassSecuritySpy.mock.calls[0][0] as string;
    expect(renderedHtml).toContain('&lt;script&gt;');
    expect(renderedHtml).not.toContain('<script>');
  });

  it('should pass the parsed HTML to bypassSecurityTrustHtml', async () => {
    const md = '# Title\n\nContent here.\n';
    httpClientSpy.get.mockReturnValue(of(md));

    await firstValueFrom(service.load('/assets/test.md'));

    expect(bypassSecuritySpy).toHaveBeenCalledOnce();
    const calledWith = bypassSecuritySpy.mock.calls[0][0] as string;
    expect(calledWith).toContain('<h1>');
    expect(calledWith).toContain('Title');
  });
});
