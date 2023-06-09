import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [
  {path:'', component:HomepageComponent},
  {path: '**', loadComponent:()=> import('./components/not-found/not-found.component').then(c => c.NotFoundComponent)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
