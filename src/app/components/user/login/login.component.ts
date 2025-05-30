import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/utility/notification/notification.service';
import { AuthService } from '../../../services/utility/security/auth.service';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements AfterViewInit {

  username = '';
  password = '';
  passwordFieldType: string = 'password';
  errorMessage = '';
  GOOGLE_CLIENT_ID = "128093420618-9v0n7iir2b4522v9bbo0vf2q8ef2ika4.apps.googleusercontent.com";

  constructor(
    private authService: AuthService, 
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngAfterViewInit(): void {
    google.accounts.id.initialize({
      client_id: this.GOOGLE_CLIENT_ID,
      callback: (response: any) => this.handleGoogleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      document.getElementById("google-button"),
      { size: "medium" }
    );
  }

  triggerGoogleSignIn(): void {
    
  }

  handleGoogleCredentialResponse(response: any): void {
    const credential = response.credential;
    this.authService.googleLogin(credential).subscribe(
      res => {
        this.notificationService.sendSuccessMsg('Login successful.');
        this.router.navigate(['/dashboard']);
      },
      err => {
        this.notificationService.sendErrorMsg('Google Login failed.');
      }
    );
  }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      success => {
        if (success) {
          this.notificationService.sendSuccessMsg('Login successful.');
          this.router.navigate(['/dashboard']);
        }
      }
    );
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}