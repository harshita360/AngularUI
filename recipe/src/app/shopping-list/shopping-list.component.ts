import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  // ingredients:Ingredient[] = [
  //   new Ingredient("Apples",5),
  //   new Ingredient("Tomatoes",10)
  // ];
  ingredients:Ingredient[];

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients=this.shoppingListService.getIngredients();
    //whenever the ingredient array changes, i.e new added or removed we know 
    this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients=ingredients;
      }
    );
  }

  onEditItem(index:number){
    this.shoppingListService.startedEditing.emit(index);
    
  }


}
