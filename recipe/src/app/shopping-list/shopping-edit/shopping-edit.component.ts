import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
 // @ViewChild('nameInput') nameInputRef:ElementRef;
 // @ViewChild('amountInput') amountInputRef:ElementRef;
 // @Output() ingredientAdded= new EventEmitter<Ingredient>();
 @ViewChild('f')slForm:NgForm;

 subscription:Subscription;
 editMode=false;
 editedItemIndex:number;
 editedItem:Ingredient;

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.shoppingListService.startedEditing.subscribe(
      (index)=>{
        this.editMode=true; //to know if we are creating a new infredient or modifying an exisiting one
        this.editedItemIndex=index;
        //load the item into the shopping list form now
        this.editedItem=this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        }) 

      }
    );
  }

  // onAddItem(){
  //  const newIngredient = new Ingredient(this.nameInputRef.nativeElement.value,this.amountInputRef.nativeElement.value);
  // // this.ingredientAdded.emit(newIngredient);
  // this.shoppingListService.addIngredient(newIngredient);
  // }

  onSubmit(form:NgForm){
  const value=form.value;
  const newIngredient=new Ingredient(value.name,value.amount);
  if(this.editMode){
    this.shoppingListService.updateIngredient(this.editedItemIndex,newIngredient);
  }else{
  this.shoppingListService.addIngredient(newIngredient);
  }
  this.editMode=false; //ensures that we leave the editMode after editing
  form.reset();

  }

  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

}
