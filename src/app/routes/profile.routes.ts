import { Routes } from "@angular/router";
import { AccountPage } from "@features/profile/account/account.page";
import { ConfigPage } from "@features/profile/config/config.page";
import { ProfilePage } from "@features/profile/profile/profile.page";
import { RunHistoryPage } from "@features/profile/run-history/run-history.page";
import { ChangePasswordPage } from "@features/profile/security/change-password/change-password.page";
import { SecurityPage } from "@features/profile/security/security.page";

export const profileRoutes: Routes = [
  { path: 'profile', component: ProfilePage },
  { path: 'profile/account', component: AccountPage },
  { path: 'profile/run-history', component: RunHistoryPage },
  { path: 'profile/config', component: ConfigPage },
  { path: 'profile/security', component: SecurityPage },
  { path: 'profile/security/change-password', component: ChangePasswordPage },
];
