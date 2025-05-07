import { Routes } from "@angular/router";
import { AuthStartPage } from "../pages/auth-start/auth-start.page";
import { LoginPage } from "../features/auth/login/login.page";
import { RegisterPage } from "../features/auth/register/register.page";
import { ForgotPasswordPage } from "../features/auth/forgot-password/forgot-password.page";

export const authRoutes: Routes = [
  { path: 'auth-start', component: AuthStartPage },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'forgot-password', component: ForgotPasswordPage },
];
