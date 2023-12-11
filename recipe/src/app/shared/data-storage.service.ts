import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap } from "rxjs";
import { Ingredient } from "./ingredient.model";

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
        //make sure ingredient property is not undefined
        return this.http.get<Recipe[]>('https://projectrecipe-6b622-default-rtdb.firebaseio.com/recipes.json').pipe(map(recipes =>{
            return recipes.map(recipe=>{
                return {...recipe, ingredients:recipe.ingredients? recipe.ingredients:[]}
            });
        }),
        tap(recipes =>{
            this.recipeService.setRecipes(recipes);
        })
        )
    }
}//Where to subcribe learn in video 286