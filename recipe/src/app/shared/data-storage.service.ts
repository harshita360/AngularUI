import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs";
import { Ingredient } from "./ingredient.model";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn:'root'}) //can also place it in the providers array in the app module
export class DataStorageService{

    constructor(private http:HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        //the below returns an observable to which we can suscribe
        this.http.put('https://projectrecipe-6b622-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(response=>{
            console.log(response);
        });
    }

    fetchRecipes(){
        //take is an rxjs operator that we need to tell that we want to tske only on e value from that observable and then unsubscribe.
        //exhaustMap waits for the user observable to complete, that is user observable.
        //the user observable is next replaced with observale returned insoide exhaustmap function
        return this.authService.user.pipe(
            take(1), 
            exhaustMap( user => {
            return this.http.get<Recipe[]>('https://projectrecipe-6b622-default-rtdb.firebaseio.com/recipes.json',
            {
                params: new HttpParams().set('auth',user.getToken())// pass the token as a query parameter
            }
            );
        }),
        map(recipes =>{
            return recipes.map(recipe=>{
                return {
                    ...recipe, ingredients:recipe.ingredients? recipe.ingredients:[]
                };
            });
    }),tap(recipes =>{
        this.recipeService.setRecipes(recipes);
    })
    );
    
        //make sure ingredient property is not undefined
        // return this.http.get<Recipe[]>('https://projectrecipe-6b622-default-rtdb.firebaseio.com/recipes.json').pipe(map(recipes =>{
        //     return recipes.map(recipe=>{
        //         return {...recipe, ingredients:recipe.ingredients? recipe.ingredients:[]}
        //     });
        // }),
        // tap(recipes =>{
        //     this.recipeService.setRecipes(recipes);
        // })
        // )
    
}//Where to subcribe learn in video 286
}