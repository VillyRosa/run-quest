import { Routes } from "@angular/router";
import { AuthStartPage } from "../pages/auth-start/auth-start.page";
import { LoginPage } from "../features/auth/login/login.page";
import { RegisterPage } from "../features/auth/register/register.page";

export const authRoutes: Routes = [
  { path: 'auth-start', component: AuthStartPage },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
];
