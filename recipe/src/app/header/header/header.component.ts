import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private dataStorageService:DataStorageService){}

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
//@Output() featureSelect = new EventEmitter<string>(); // we attach this property to the component which will use this property


//  onSelect(feature:string){
//    this.featureSelect.emit(feature);
//  }

}

//here we are emiiting the value of feature to the app component to tell it which feature has been
//selected by the user i.e recipe/shoppinf so that app component displays content specifically
