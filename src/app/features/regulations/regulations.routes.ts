import { Routes } from '@angular/router';
import { RegulationsList } from './regulations-list/regulations-list';
import { RegulationDetail } from './regulation-detail/regulation-detail';

export const REGULATIONS_ROUTES: Routes = [
  { path: '', component: RegulationsList },
  { path: ':id', component: RegulationDetail },
];
