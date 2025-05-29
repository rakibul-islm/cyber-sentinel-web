import { Component, OnInit, ViewChild } from '@angular/core';
import { Profile, User } from '../../../../services/user/domain/user.domain';
import { BaseComponent } from '../../../base.component';
import { AuthService } from '../../../../services/utility/security/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user/user.service';
import { ConfirmationService } from '../../../../services/utility/confirmation/confirmation.service';
import { NotificationService } from '../../../../services/utility/notification/notification.service';
import { AppHeaderComponent } from '../../../app-header/app.header.component';

@Component({
  selector: 'profile-form',
  templateUrl: './profile.form.component.html'
})
export class ProfileFormComponent extends BaseComponent implements OnInit {
  profile: Profile = new Profile();
  user: User = new User();
  profileForm!: FormGroup;
  imageBase64!: string;

  constructor(
    private formBuilder: FormBuilder, 
    protected authService: AuthService,
    private router: Router,
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private notificationService: NotificationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.prepareForm();
    this.authService.getProfileData().subscribe(profile => {
      this.profile = profile;
      this.fetchProfileDataById(this.profile.id);
    });
  }


  prepareForm(formData?: User) {
    formData = formData || new User();

    this.profileForm = this.formBuilder.group({
      fullName: [formData.fullName, Validators.required],
      username: [formData.username, Validators.required],
      email: [formData.email, [Validators.required, Validators.email]],
      address: [formData.address, Validators.required],
      mobile: [formData.mobile, [Validators.required, Validators.pattern('^[0-9]{10,15}$'), Validators.minLength(11), Validators.maxLength(11)]],
      password: [formData.password],
      phone: [formData.phone]
  })
}

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageBase64 = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.imageBase64 = '';
  }

  fetchProfileDataById(id: number) {
    if(!id) { return; }

    this.subscribers.fetchProfileDataSub = this.userService.fetchProfileById({id: id})
    .subscribe(data => {
      this.user = data?.obj;
      this.imageBase64 = this.profile.imageBase64;
      this.prepareForm(this.user);
    });
  }
  
  submit() {
    this.markFormGroupAsTouched(this.profileForm);
    if (this.profileForm.invalid) { return; }

    const user: User = {
      ...this.user,
      ...this.profileForm.getRawValue(),
      imageBase64: this.imageBase64?.split(',')[1] || ''
    };

    this.confirmationService.confirm(
      user.password ? "You'll need to sign in with your new password after this. Continue?" : "Are you sure you want to proceed?",
      () => {
        this.updateProfile(user);
      })
  }

  updateProfile(user: User) {
    this.subscribers.updateProfileSub = this.userService.updateProfile(user)
    .subscribe(data => {
      this.notificationService.sendSuccessMsg('Profile Update Successful!');
      if(user.password) {
        this.logout();
        return;
      }
      this.navigateToProfile();
    });
  }

  navigateToProfile(){
    this.router.navigate(['/profile']).then(() => {
      window.location.reload();
    });    
  }

  logout(): void {
    this.authService.logout();
    window.location.reload();
  }

}
