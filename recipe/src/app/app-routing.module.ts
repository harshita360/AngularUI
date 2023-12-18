import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeResolverService } from './recipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'/recipes', pathMatch:'full'},
  {path:'recipes', component:RecipesComponent, canActivate: [AuthGuard],children:[
    {path:'', component:RecipeStartComponent },//for the route just /recipe
    {path: 'new', component:RecipeEditComponent},
    {path: ':id', component:RecipeDetailComponent,resolve:[RecipeResolverService] },
    {path: ':id/edit', component:RecipeEditComponent, resolve:[RecipeResolverService]},
  ]},
  {path:'shopping-list', component:ShoppingListComponent},
  {path: 'auth', component:AuthComponent}
];
//through the resolver we run the fetchRecipes method whenever edit / detail compoennt component is loaded

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
