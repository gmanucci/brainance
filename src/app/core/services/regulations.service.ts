import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { Regulation, RegulationIssuer, RegulationTopic } from '../models/regulation.model';

@Injectable({ providedIn: 'root' })
export class RegulationsService {
  private readonly http = inject(HttpClient);

  private readonly regulations = toSignal(
    this.http
      .get<Regulation[]>('assets/regulations.json')
      .pipe(map((data) => data ?? [])),
    { initialValue: [] as Regulation[] }
  );

  getAll() {
    return this.regulations;
  }

  getById(id: string) {
    return computed(() => this.regulations().find((r) => r.id === id));
  }

  getByTopic(topic: RegulationTopic) {
    return computed(() => this.regulations().filter((r) => r.topics.includes(topic)));
  }

  getByIssuer(issuer: RegulationIssuer) {
    return computed(() => this.regulations().filter((r) => r.issuer === issuer));
  }
}
