import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { from } from 'rxjs';
import { promise } from 'protractor';
import { resolve } from 'url';
import { AngularFirestore } from '@angular/fire/firestore';
//import { firestore } from 'firebase';
import {HttpClient} from '@angular/common/http';
import { Platform } from '@ionic/angular';




@Injectable({
  providedIn: 'root'

})

export class AuthService {
  //private url="http://localhost/ionic_2/api/usuarios.php"
  private url="https://privadaarboledas.net/app/app_ionic/api/usuarios.php"
  token_us: string;

  constructor(private AFauth: AngularFireAuth, private router: Router,private http: HttpClient,public platform: Platform) { }

  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.AFauth.createUserWithEmailAndPassword(email, password).then(res => {
        resolve(res)
      }).catch(err => reject(err))
    })
  }

  login(email: string, password: string) {
    return new Promise((resolve, rejected) => {
      this.AFauth.signInWithEmailAndPassword(email, password).then(user => {        
        this.token_us=user.user.refreshToken                        
        console.log("Datos Usuario", user.user);
        
        resolve(user);
      }).catch(err => rejected(err)
      );
    });

  }

  update( id: string, bd_name: string,bd_user: string,bd_pwd: string){
    return this.http.put(this.url+'?id='+id+'&token='+this.token_us+'&bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd,'');

  }

  
  logout() {
    this.AFauth.signOut().then(() => {
      this.router.navigate(['/home']);
    });
  }

  getUserAuth(){
    return this.AFauth.authState
  }

}