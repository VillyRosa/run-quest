import { Routes } from '@angular/router';
import { AuthStartPage } from './pages/auth-start/auth-start.page';
import { LoginPage } from './features/auth/login/login.page';
import { RegisterPage } from './features/auth/register/register.page';
import { authGuard } from './guards/auth.guard';
import { HomePage } from './pages/home/home.page';
import { RacePage } from './features/race/race/race.page';
import { ChallengesPage } from './features/challenges/challenges/challenges.page';
import { ProfilePage } from './features/profile/profile/profile.page';
import { RunHistoryPage } from './features/profile/run-history/run-history.page';
import { TabsPage } from './layout/tabs/tabs.page';
import { RaceResultPage } from './features/race/race-result/race-result.page';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: TabsPage,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomePage },
      { path: 'home/race', component: RacePage },
      { path: 'home/race-result/:id', component: RaceResultPage },
      { path: 'challenges', component: ChallengesPage },
      { path: 'profile', component: ProfilePage },
      { path: 'profile/run-history', component: RunHistoryPage },
    ]
  },
  { path: 'auth-start', component: AuthStartPage },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
];
