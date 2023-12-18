import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isAuthenticated = false;
  constructor(private dataStorageService:DataStorageService, private authService:AuthService){}
  ngOnInit() {
   this.authService.user.subscribe(user =>{
      this.isAuthenticated = !user?false:true;
   });
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  logout(){
    this.authService.logout();
  }
//@Output() featureSelect = new EventEmitter<string>(); // we attach this property to the component which will use this property


//  onSelect(feature:string){
//    this.featureSelect.emit(feature);
//  }

}

//here we are emiiting the value of feature to the app component to tell it which feature has been
//selected by the user i.e recipe/shoppinf so that app component displays content specifically
