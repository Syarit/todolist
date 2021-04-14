import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import {User} from '../../Models/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  errorMessage = '';
  successMessage = '';

  user: User = {displayName: '', email: '', password: ''};

  constructor(private authService: AuthService, private router: Router) { }


  tryGoogleSignIn(): void{
    this.authService.doGoogleLogin()
      .then(res => {
          this.router.navigate(['/list']);
        }, err => console.log(err)
      );
  }


  tryRegister(): void{
    this.authService.doRegister(this.user)
      .then(res => {
        this.errorMessage = '';
        this.successMessage = 'Your account has been created';
        this.router.navigate(['/list']);
      }, err => {
        console.error(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      });
  }

}
