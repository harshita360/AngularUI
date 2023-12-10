import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeature = 'recipe';

  //$event in the function argument of html template always point to event data. Hence we use string here.
  onNavigate(feature: string){
   this.loadedFeature=feature;
  }
  
}
