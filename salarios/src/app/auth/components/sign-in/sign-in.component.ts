import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { PasswordRecoveryComponent } from '../password-recovery/password-recovery.component';
import { PopupComponent } from '../../../popups/component/popup/popup.component';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  authData={
    email:''
   ,password:''
 }

 samePassword='';
 passwordColor='#6C757D';
 emailColor='#6C757D';
 lengthColor='#6C757D';
 upperColor='#6C757D';
 numberColor='#6C757D';
 emailValid=false;
 passwordLength=true;
 passwordUpper=true;
 passwordNumber=true;
 passwordConfirmation=false;

 constructor(private authService: AuthService, private route: Router, public dialog: MatDialog){}

 signIn(){
  this.authService.login(this.authData.email, this.authData.password).then(res=>{
    let data={
      title:'Acceso Confirmado',
      messagge:'¡Bienvenido al sistema!',
      command:'Continuar'
    }
    this.viewMessage(data);
  }).catch(err=>this.errorMessage())
 }

 recuperarPassword(){
  const dialogRef = this.dialog.open(PasswordRecoveryComponent, { panelClass:'password-recovery-container'});

  dialogRef.afterClosed().subscribe(result => {
  //this.animal = result;
  
  });
 }

 viewMessage(element: any): void {
  console.log(element);
  
  const dialogRef = this.dialog.open(PopupComponent, { panelClass:'popup-container',
    data: element,

  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.route.navigate(['inicio']);
    //this.animal = result;
  });
  
}

 errorMessage(): void {
  
  
  const dialogRef = this.dialog.open(PopupComponent, { panelClass:'popup-container',
    data: {
      title:'Acceso Denegado',
      messagge:'¡Verifique sus datos de ingreso!',
      command:'Continuar'
    },

  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    //this.animal = result;
  });
  
}

validarEmail(){
  if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(this.authData.email)){
    this.emailValid=false
  }else{
    this.emailColor='#E63256'
    this.emailValid=true;
  }
}

validatePassword(){
  if(this.emailValid===false&&this.passwordLength===true && this.passwordUpper===true && this.passwordNumber===true){
    return true;
  }else{
    return false;
  }
}
validatePasswordLength(){
  if(this.authData.password.length>=8){
    this.lengthColor='#0B9B72'
    this.passwordLength=true;
  }else{
    this.lengthColor='#E63256'
    this.passwordLength=false;
  }
}
validatePasswordUpper(){
  var letras_mayusculas="ABCDEFGHYJKLMNÑOPQRSTUVWXYZ";
  for(let i=0; i<this.authData.password.length; i++){
    if (letras_mayusculas.indexOf(this.authData.password.charAt(i),0)!=-1){
      this.upperColor='#0B9B72'
      this.passwordUpper=true;
       return true;
    }
 }
 this.upperColor='#E63256'
 this.passwordUpper=false;
 return false;
}
validateNumberPassword(){
  var numeros="0123456789";
  for(let i=0; i<this.authData.password.length; i++){
    if (numeros.indexOf(this.authData.password.charAt(i),0)!=-1){
      this.numberColor='#0B9B72'
      this.passwordNumber=true;
       return true;
    }
 }
 this.numberColor='#E63256'
 this.passwordNumber=false;
 return false;  
}
}
