import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppHeaderComponent } from './components/app-header/app.header.component';
import { ProfileViewComponent } from './components/user/profile/view/profile.view.component';
import { ToastrModule } from 'ngx-toastr';
import { RegistrationFormComponent } from './components/user/registration/registration.form.component';
import { ConfirmationDialogComponent } from './components/utility/confirmation-dialog/confirmation.dialog.component';
import { ConfirmationService } from './services/utility/confirmation/confirmation.service';
import { AuthService } from './services/utility/security/auth.service';
import { AuthInterceptor } from './services/utility/interceptors/auth.interceptor';
import { SqlInjectionDetectionComponent } from './components/vulnerability-scanner/sql-injection-detection/sql.injection.detection.component';
import { CheckPasswordStrengthComponent } from './components/vulnerability-scanner/check-password-strength/check.password.strength.component';
import { PasswordEncodeDecodeComponent } from './components/vulnerability-scanner/password-encode-decode/password.encode.decode.component';
import { ProfileFormComponent } from './components/user/profile/form/profile.form.component';
import { LoaderComponent } from './components/utility/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoaderComponent,
    DashboardComponent,
    AppHeaderComponent,
    ProfileViewComponent,
    ProfileFormComponent,
    RegistrationFormComponent,
    ConfirmationDialogComponent,
    SqlInjectionDetectionComponent,
    CheckPasswordStrengthComponent,
    PasswordEncodeDecodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule, 
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    ConfirmationService,
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
