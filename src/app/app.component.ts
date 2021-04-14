import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase/app';
import {AuthService} from './features/service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todolist';
  authState: firebase.User | null = null;

  constructor(private authService: AuthService, private router: Router) {
    authService.getConnectedUser().then(res => this.authState = res);
  }

  signout(): void {
    this.authService.doLogout().then(res => {
      this.router.navigate(['/login']);
    });
  }
}
