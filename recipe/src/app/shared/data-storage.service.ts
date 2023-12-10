import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn:'root'}) //can also place it in the providers array in the app module
export class DataStorageService{
    constructor(private http:HttpClient, private recipeService: RecipeService) {}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        //the below returns an observable to which we can suscribe
        this.http.put('https://projectrecipe-6b622-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(response=>{
            console.log(response);
        });
    }

    fetchRecipes(){
        this.http.get('https://projectrecipe-6b622-default-rtdb.firebaseio.com/recipes.json').subscribe(recipes=>{
            console.log(recipes);
        })
    }
}//Where to subcribe learn in video 286