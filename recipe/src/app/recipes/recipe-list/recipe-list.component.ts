import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  
  //@Output() recipeWasSelected=new EventEmitter<Recipe>();
  // recipes:Recipe[]=[
  //   new Recipe("A test Recipe","This is test","https://en.wikipedia.org/wiki/Bruschetta#/media/File:2014_Bruschetta_The_Larder_Chiang_Mai.jpg"),
  //   new Recipe("Another test Recipe2","This is test","https://en.wikipedia.org/wiki/Bruschetta#/media/File:2014_Bruschetta_The_Larder_Chiang_Mai.jpg"),
    
  // ];
  recipes:Recipe[];
  
  constructor(private recipeService:RecipeService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.recipeService.recipesChanged.subscribe(
      (recipes:Recipe[])=>{
        this.recipes=recipes;
      }
    );
    this.recipes=this.recipeService.getRecipes();
  }
  onNewRecipe(){
   this.router.navigate(['new'],{relativeTo:this.route})
  }

  

}
