import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase/app';
import {Observable, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public afAuth: AngularFireAuth ) { }

  getConnectedUser(): Promise<any> {
    return new Promise(resolve => {
      this.afAuth.authState.subscribe(res => {
        resolve(res);
      });
    });
  }


  doGoogleLogin(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      provider.addScope('name');
      this.afAuth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        });
    });
  }

  doRegister(value: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          res.user?.updateProfile({
            displayName: value.displayName
          });
          resolve(res);
        }, err => reject(err));
    });
  }

  doLogin(value: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });
  }

  doLogout(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser){
        this.afAuth.signOut().then(res => {
          resolve();
        });
      }
      else{
        reject();
      }
    });
  }
}
