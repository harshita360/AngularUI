import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";
@Injectable({providedIn:'root'})// accessible application wide
export class RecipeResolverService implements Resolve<Recipe[]>{
    //implement resolve interface
    constructor(private dataStorageService:DataStorageService, private recipeService:RecipeService){}
    resolve(route: ActivatedRouteSnapshot, state:RouterStateSnapshot){
        //only fetch recipes if we dont have recipes otherwise chnages get overwriiten
        const recipes= this.recipeService.getRecipes();
        if(recipes.length === 0){
        return this.dataStorageService.fetchRecipes();
        }else{
            return recipes;
        }
        //not subscribe explicitly here. The resolver will subscribe for us to find out once data is there.
        //adding resolver as recipe detail component cannot display until fetch data has been clicked.
    }
  //  through the resolver we run the fetchRecipes method whenever edit / detail compoennt component is loaded
}