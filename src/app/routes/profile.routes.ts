import { Routes } from "@angular/router";
import { ProfilePage } from "../features/profile/profile/profile.page";
import { RunHistoryPage } from "../features/profile/run-history/run-history.page";

export const profileRoutes: Routes = [
  { path: 'profile', component: ProfilePage },
  { path: 'profile/run-history', component: RunHistoryPage }
];
