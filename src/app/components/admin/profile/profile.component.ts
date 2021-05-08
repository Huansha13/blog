import {Component, Input, OnInit} from '@angular/core';
import { FormGroup,  FormControl, Validators } from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';
import {UserI} from '../../../shared/models/user.interface';
import { FileI } from '../../../shared/models/file.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public image: any = null;
  public currentImage = 'https://freevectoricon.com/wp-content/uploads/2020/08/generic-profile-icon-45209-free-icons-library-1024x1024.jpg';

  constructor( private authSvc: AuthService) { }

  public profileForm = new FormGroup({
    displayName: new FormControl('', Validators.required),
    email: new FormControl({ value: '', disabled: true }, Validators.required),
    photoURL: new FormControl( '', Validators.required),
    // phoneNumber: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    // this.initValuesForm(user)
    this.authSvc.userData$.subscribe( user => {
      this.initValuesForm(user);
    });
  }
  onSaveUser(user: UserI): void {
    // this.authSvc.saverUsrProfile(user, this.image);
    console.log('ruta', user);
    if (this.currentImage === user.photoURL) {
      user.photoURL = this.currentImage;
      this.authSvc.preSaveUserProfolio(user);
      console.log(user, 'no se 1');
    }else {
      this.authSvc.preSaveUserProfolio(user, this.image);
      console.log(user, 'no se 2');
    }
  }

  private initValuesForm(user: UserI): void {
    if (user.photoURL) {
      this.currentImage = user.photoURL;
      console.log('ruta2', user.photoURL);
      console.log('ruta3', this.currentImage);
    }
    this.profileForm.patchValue({
      displayName: user.displayName,
      email: user.email,
      // phoneNumber: user.phoneNumber
    });
    console.log(this.profileForm);
  }
  handleImg( event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.currentImage = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.image = event.target.files[0];
    } else {
      this.currentImage = 'https://freevectoricon.com/wp-content/uploads/2020/08/generic-profile-icon-45209-free-icons-library-1024x1024.jpg';
      this.image = null;
    }
  }
}
















