import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationSearchComponent } from './location-search/location-search.component';
const routes: Routes = [
  {path:'', redirectTo:'home',pathMatch:'full'},
  {path:'home',component:LocationSearchComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
