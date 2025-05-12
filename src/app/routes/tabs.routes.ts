import { Routes } from "@angular/router";
import { authGuard } from "@guards/auth.guard";
import { TabsPage } from "@layout/tabs/tabs.page";
import { homeRoutes } from "./home.routes";
import { profileRoutes } from "./profile.routes";

export const tabsRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: TabsPage,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      ...homeRoutes,
      ...profileRoutes,
    ]
  }
];
