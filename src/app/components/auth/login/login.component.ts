import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {UserI} from '../../../shared/models/user.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  opened = true;

  constructor( private authSrv: AuthService, private router: Router) { }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    /*const user: UserI = {
      email: 'yefer@gmail.com',
      password: '123456'
    };
    this.authSrv.loginByEmail(user);*/
  }

  onLogin(form: UserI): void {
    this.authSrv
      .loginByEmail(form)
      .then(res => {
          console.log('Successfully', res);
          this.router.navigate(['/home']);
        })
      .catch(err => console.log('Error', err));
  }

}

















