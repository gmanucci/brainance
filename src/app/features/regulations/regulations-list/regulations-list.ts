import { Component, signal, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { RegulationsService } from '../../../core/services/regulations.service';
import { RegulationIssuer } from '../../../core/models/regulation.model';

@Component({
  selector: 'app-regulations-list',
  imports: [RouterLink, SlicePipe],
  templateUrl: './regulations-list.html',
})
export class RegulationsList {
  private readonly regulationsService = inject(RegulationsService);
  private readonly route = inject(ActivatedRoute);

  private readonly queryIssuer = toSignal(
    this.route.queryParamMap.pipe(map((p) => p.get('issuer'))),
    { initialValue: null }
  );

  readonly activeIssuer = signal<RegulationIssuer | null>(null);

  readonly issuers: RegulationIssuer[] = ['CVM', 'ANBIMA', 'B3', 'BCB', 'CMN'];

  readonly filtered = computed(() => {
    const issuer = this.activeIssuer() ?? (this.queryIssuer() as RegulationIssuer | null);
    const all = this.regulationsService.getAll()();
    return issuer ? all.filter((r) => r.issuer === issuer) : all;
  });

  setIssuer(issuer: RegulationIssuer | null) {
    this.activeIssuer.set(issuer);
  }

  issuerClass(issuer: RegulationIssuer): string {
    const map: Record<string, string> = {
      CVM:    'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
      ANBIMA: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
      B3:     'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      BCB:    'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
      CMN:    'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
    };
    return map[issuer] ?? 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300';
  }
}
