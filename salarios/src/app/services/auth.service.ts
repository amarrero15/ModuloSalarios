import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(email:string, password:string){
    return new Promise((resolve, rejected) => {
      /*
      this.AFauth.signInWithEmailAndPassword(email, password).then(user =>{
        //localStorage.setItem('userId', user.user?.uid.toString() as string);
        localStorage.setItem('uid', user.user?.uid.toString() as string);
        resolve(user);
      }).catch(err => rejected(err));*/
    });
  }
}
