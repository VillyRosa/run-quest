import { Routes } from '@angular/router';
import { tabsRoutes } from './tabs.routes';
import { authRoutes } from './auth.routes';

export const routes: Routes = [
  ...tabsRoutes,
  ...authRoutes
];
