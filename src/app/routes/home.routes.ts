import { Routes } from "@angular/router";
import { HomePage } from "../pages/home/home.page";
import { RacePage } from "@features/race/race/race.page";
import { RaceResultPage } from "@features/race/race-result/race-result.page";

export const homeRoutes: Routes = [
  { path: 'home', component: HomePage },
  { path: 'home/race', component: RacePage },
  { path: 'home/race-result/:id', component: RaceResultPage }
];
