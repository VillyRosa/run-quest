import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { ChallengesPage } from '../challenges/challenges.page';
import { RacePage } from '../race/race.page';
import { ProfilePage } from '../profile/profile.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      { path: 'home', component: HomePage },
      { path: 'home/race', component: RacePage },
      { path: 'challenges', component: ChallengesPage },
      { path: 'profile', component: ProfilePage },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];
