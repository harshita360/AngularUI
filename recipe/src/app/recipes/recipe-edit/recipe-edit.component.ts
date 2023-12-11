import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
id:number;
editMode=false;
recipeForm:FormGroup;
  constructor(private route:ActivatedRoute, private  recipeService:RecipeService, private router :Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) =>{
         this.id= +params['id'];
         this.editMode= params['id'] !=null;
         console.log(this.editMode);
         this.initForm(); // call it when our route params change that is when we reload the page
      }
    );
  }

  //Reactive approach of forms for Edit Recipe Form

  private initForm(){
    let recipeName='';
    let recipeImagePath='';
    let recipeDescription='';
    let recipeIngredients=new FormArray([]); //initialized with deafult value of empty array
    
    if(this.editMode){
      const recipe=this.recipeService.getRecipe(this.id);
      recipeName=recipe.name;
      recipeImagePath="assets/recipe1.jpg";
      recipeDescription=recipe.description;
      if (recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name':new FormControl(ingredient.name,Validators.required),
              'amount':new FormControl(ingredient.amount,
                [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }
    //key value pairs for the pairs for the controls we want to register
   this.recipeForm=new FormGroup({
     'name':new FormControl(recipeName,Validators.required),
     'imagePath':new FormControl(recipeImagePath,Validators.required),
     'description':new FormControl(recipeDescription,Validators.required),
     'ingredients':recipeIngredients
   });
  }

  onSubmit(){
    //console.log(this.recipeForm);
    const newRecipe = new Recipe(this.recipeForm.value['name'],this.recipeForm.value['description'],this.recipeForm.value['imagePath'],
    this.recipeForm.value['ingredients']);
    //instead of accessing individual parameters since itbis in the right format which we need we can directly use this.recipeForm.value;
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,newRecipe);
    }else{
      this.recipeService.addRecipe(this.recipeForm.value); // or newRecipe
    }
    //now navigate away
    this.onCancel();

  }

  onAddIngredient(){
    //explicit 
   (<FormArray>this.recipeForm.get('ingredients')).push(
    new FormGroup({
      'name':new FormControl(null,Validators.required),
      'amount':new FormControl(null,[
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    })
   )
  }
  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onCancel(){
    //go up one level
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
