//to manipulate the htto request

import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, exhaustMap, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authService:AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        //add token here
        //take is an rxjs operator that we need to tell that we want to tske only on e value from that observable and then unsubscribe.
        //exhaustMap waits for the user observable to complete, that is user observable.
        //the user observable is next replaced with observale returned insoide exhaustmap function
        return this.authService.user.pipe(
            take(1), 
            exhaustMap( user => {
                if(!user){
                    return next.handle(req);
                }
                const modifiedRequest = req.clone({params: new HttpParams().set('auth',user.getToken())
            });
                return next.handle(modifiedRequest); 
            }));
           

    }

}