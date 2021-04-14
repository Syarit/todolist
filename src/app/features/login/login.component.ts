import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../../Models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // @ts-ignore
  loginForm: FormGroup;
  errorMessage = '';
  user: User = {displayName: '', email: '', password: ''};

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required]
    });
  }

  tryGoogleLogin(): void {
    this.authService.doGoogleLogin()
      .then(res => {
        this.router.navigate(['/list']);
      });
  }

  tryLogin(): void {
    this.authService.doLogin(this.user)
      .then(res => {
        this.router.navigate(['/list']);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
      });
  }

}
