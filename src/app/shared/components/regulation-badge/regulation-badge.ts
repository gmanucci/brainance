import { Component, input, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RegulationsService } from '../../../core/services/regulations.service';

@Component({
  selector: 'app-regulation-badge',
  imports: [RouterLink],
  template: `
    @if (regulation()) {
      <a
        [routerLink]="['/regulamentacao', regulation()!.id]"
        class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border transition-colors"
        [class]="badgeClass()"
      >
        <span class="font-semibold">{{ regulation()!.issuer }}</span>
        <span>{{ regulation()!.type }} {{ regulation()!.number }}</span>
      </a>
    }
  `,
})
export class RegulationBadge {
  readonly regulationId = input.required<string>();

  private readonly regulationsService = inject(RegulationsService);
  readonly regulation = computed(() =>
    this.regulationsService.getById(this.regulationId())()
  );

  readonly badgeClass = computed(() => {
    const issuer = this.regulation()?.issuer;
    const map: Record<string, string> = {
      CVM:   'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800',
      ANBIMA:'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
      B3:    'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800',
      BCB:   'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800',
      CMN:   'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800',
    };
    return map[issuer ?? ''] ?? 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600';
  });
}
