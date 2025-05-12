import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileViewComponent } from './components/user/profile/view/profile.view.component';
import { RegistrationFormComponent } from './components/user/registration/registration.form.component';
import { AuthGuard } from './services/utility/security/auth.guard';
import { SqlInjectionDetectionComponent } from './components/vulnerability-scanner/sql-injection-detection/sql.injection.detection.component';
import { CheckPasswordStrengthComponent } from './components/vulnerability-scanner/check-password-strength/check.password.strength.component';
import { PasswordEncodeDecodeComponent } from './components/vulnerability-scanner/password-encode-decode/password.encode.decode.component';
import { ProfileFormComponent } from './components/user/profile/form/profile.form.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegistrationFormComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', 
    component: ProfileViewComponent,
    canActivate: [AuthGuard]
  },
  { path: 'profile/edit', 
    component: ProfileFormComponent,
    canActivate: [AuthGuard]
  },
  { path: 'sql-injection-detection', 
    component: SqlInjectionDetectionComponent,
    canActivate: [AuthGuard]
  },
  { path: 'check-password-strength',
    component: CheckPasswordStrengthComponent,
    canActivate: [AuthGuard]
  },
  { path: 'password-encode-decode',
    component: PasswordEncodeDecodeComponent,
    canActivate: [AuthGuard]
  },

  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
