import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-auth",
    templateUrl: './auth.component.html'
})

export class AuthComponent{

    constructor(private authService:AuthService, private router:Router){}
    isLoginMode = true;
    isLoading = false;
    error:string = null;

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form:NgForm){
     console.log(form.value);
     const email = form.value.email;
     const password = form.value.password;
     this.isLoading=true;
     if(this.isLoginMode){
        this.authService.signin(email,password).subscribe(response => {
            console.log(response);
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        }, errorMessage => {
            console.log(errorMessage);
            this.error = errorMessage;
            this.isLoading=false;
        })

     }else{
        this.authService.signup(email,password).subscribe(response =>{
            console.log(response);
            this.isLoading=false;
            this.router.navigate(['/recipes']);
         }, errorMessage =>{
            console.log(errorMessage);
            this.error = errorMessage;
            this.isLoading=false; 
            }
            
         )};
         form.reset();
     }
    }
