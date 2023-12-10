import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{
   ingredientsChanged = new EventEmitter<Ingredient[]>();
   startedEditing= new EventEmitter<number>();
   private ingredients:Ingredient[] = [
        new Ingredient("Apples",5),
        new Ingredient("Tomatoes",10)
      ];

   getIngredients(){
    return this.ingredients.slice(); //return a copy. hence have an event to tell that new ingrient added so that refreshed
   } 

   addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient); // this gets added to the original array not the copy
     this.ingredientsChanged.emit(this.ingredients.slice());   
}
addIngredients(ingredients:Ingredient[]){
  this.ingredients.push(...ingredients);
  this.ingredientsChanged.emit(this.ingredients.slice());
}


getIngredient(index:number){
  return this.ingredients[index];
}

updateIngredient(index:number,newIngredient:Ingredient){
this.ingredients[index]=newIngredient;
this.ingredientsChanged.emit(this.ingredients.slice());
}

deleteIngredient(index:number){
  this.ingredients.splice(index,1) //remove element
  this.ingredientsChanged.emit(this.ingredients.slice());

}

}