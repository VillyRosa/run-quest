import { Routes } from '@angular/router';
import { AuthStartPage } from './pages/auth-start/auth-start.page';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', canActivate: [authGuard], loadChildren: () => import('./pages/tabs/tabs.routes').then((m) => m.routes) },
  { path: 'auth-start', component: AuthStartPage },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
];
