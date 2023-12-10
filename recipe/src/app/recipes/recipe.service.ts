import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{

   // recipeSelected = new EventEmitter<Recipe>();
   recipesChanged = new EventEmitter<Recipe[]>();
    private recipes:Recipe[]=[
        new Recipe("A test Recipe","This is test","https://en.wikipedia.org/wiki/Bruschetta#/media/File:2014_Bruschetta_The_Larder_Chiang_Mai.jpg", [new Ingredient("Tomatoes",5)]),
        new Recipe("Another test Recipe2","This is test","https://en.wikipedia.org/wiki/Bruschetta#/media/File:2014_Bruschetta_The_Larder_Chiang_Mai.jpg", [new Ingredient("Potato",7)]),
        
      ]; 
    
    constructor(private shoppingListService:ShoppingListService)  {}

    // setRecipes(recipes:Recipe[]){
    //  this.recipes=recipes;
    //  this.
    // }
    getRecipes(){
     return this.recipes.slice(); //returns a copy of the recipes array
     //return this.recipes this is not recommeneded as we shouldn't be able to directly access the recipe list from outside 
     // and be able to change it from outside. In this way we always get a copy of the original array 
     //and hence any attempt to chnage the array doesn't change the original array
    }
    
    //need to use the shopping service hence add injectable
    addIngredientsToShoppingList(ingredients:Ingredient[]){
      this.shoppingListService.addIngredients(ingredients);
    }

    getRecipe(index:number){
      return this.recipes[index];
    }

    addRecipe(recipe:Recipe){
     this.recipes.push(recipe);
     this.recipesChanged.emit(this.recipes.slice());
    }

    updateRecipe(index:number,newRecipe:Recipe){
     this.recipes[index]=newRecipe;
     this.recipesChanged.emit(this.recipes.slice());
    }

    deleteRecipe(index:number){
      this.recipes.splice(index,1);
      this.recipesChanged.emit(this.recipes.slice());
    }
     
    }

