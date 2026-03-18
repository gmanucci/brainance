import { Component, input, computed } from '@angular/core';
import { Regulation } from '../../../core/models/regulation.model';

@Component({
  selector: 'app-doc-card',
  template: `
    <div class="flex items-start justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-xs font-bold px-1.5 py-0.5 rounded" [class]="issuerClass()">
            {{ regulation().issuer }}
          </span>
          <span class="text-xs text-slate-400 dark:text-slate-500">{{ regulation().type }} {{ regulation().number }}</span>
        </div>
        <p class="text-sm font-medium text-slate-900 dark:text-white mb-1">{{ regulation().title }}</p>
        <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{{ regulation().summary }}</p>
      </div>
      <div class="ml-4 flex flex-col gap-2 shrink-0">
        @if (regulation().localPath) {
          <a
            [href]="'assets/docs/' + regulation().localPath"
            download
            class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Baixar
          </a>
        }
        <a
          [href]="regulation().officialUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
          Original
        </a>
      </div>
    </div>
  `,
})
export class DocCard {
  readonly regulation = input.required<Regulation>();

  readonly issuerClass = computed(() => {
    const map: Record<string, string> = {
      CVM:    'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
      ANBIMA: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
      B3:     'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      BCB:    'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
      CMN:    'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
    };
    return map[this.regulation().issuer] ?? 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300';
  });
}
