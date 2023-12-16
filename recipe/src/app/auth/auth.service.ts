import { HttpClient } from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';

interface AuthResponseData{
  kind:string;
  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn:string;
  localId:string;
  registered?:boolean; //refers to an optional field

}//output of the authentication

@Injectable({providedIn:'root'})
export class AuthService{

//user = new EventEmitter<User>();
user = new BehaviorSubject<User>(null); // allows us to access the user event if we want to access it at a different point of time when we suscribed to the object
//for eg, we want to fetch the token field of the user only when user click fetch/store data option to see if he is allowed. hence we can pull token even though we subcribed to the user before.

constructor(private http:HttpClient){}


signin(email:string,password:string){
  return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAD5RN6D7F133jo0NuUTUeb6vOtJb-enzo',
  {
    email:email,
    password:password,
    returnSecureToken:true

  }).pipe(catchError(errorRes =>{
     console.log(errorRes);
     let errorMessage ="An unknown error occurred";
     if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }
    switch(errorRes.error.error.message){
      case 'INVALID_LOGIN_CREDENTIALS':
        console.log("here in switch");
        errorMessage = "Incorrect email/password."
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = "You are not yet registered with us!"
        break;        
  }
  return throwError(errorMessage);
  }),tap(resData => {
    this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
})
  )
}

signup(email:string, password:string){
  return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAD5RN6D7F133jo0NuUTUeb6vOtJb-enzo',
  {
    email:email,
    password:password,
    returnSecureToken: true
   }
  ).pipe(catchError(errorRes => {
    let errorMessage = 'An unknown error occurred';
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }
    switch(errorRes.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage = "The email already exists! Please Login."      
  }
   return throwError(errorMessage);
}), tap(resData => {
     this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
})
); //observable

}
//throwError from rxjs returns the error wrapped in an observable.

private handleAuthentication(email:string, userId:string, token:string,expiresIn:number){
  const expirationDate = new Date(new Date().getTime() + expiresIn*1000); //expirationDate is in milliseconds as returned by firebase. hence compare like that. Gettime returns the milliseconds over from 1970 to now.
  const user = new User(email,userId,token,expirationDate);
  this.user.next(user);
}
}