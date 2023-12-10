import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  //providers:[RecipeService]
  //should provide it in app module as this recipeService instance is lost once we navigate to Shopping list component
  //all the child components of the Recipe component recive the same instance of the Recipe Service
  //However if the cchild component have their own recipe Service deaclred in constructor then it 
  //the Recipe Service Passed from the parent is overriden by the child's component own recipe component.
})
export class RecipesComponent implements OnInit {
  //selectedRecipe:Recipe
  constructor(private recipeService:RecipeService) { }

  ngOnInit(): void {
    // this.recipeService.recipeSelected.subscribe((recipe:Recipe)=>{
    //   this.selectedRecipe=recipe;
    // }) now using router links no need to subscribe
  }

}
