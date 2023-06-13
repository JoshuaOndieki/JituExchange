import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [
  {path:'welcome', component:HomepageComponent},
  {path: 'signup', loadComponent:()=> import('./components/signup/signup.component').then(c => c.SignupComponent)},
  {path: 'signin', loadComponent:()=> import('./components/signin/signin.component').then(c => c.SigninComponent)},
  {
    path: '',
    loadComponent:()=> import('./components/main/main.component').then(c => c.MainComponent),
    children: [
      {path: '', loadComponent:()=> import('./components/home/home.component').then(c => c.HomeComponent)},
      {
        path: 'questions',
        loadComponent:()=> import('./components/questions/questions.component').then(c => c.QuestionsComponent),
        children: [
          {path: 'ask', loadComponent:()=> import('./components/ask/ask.component').then(c => c.AskComponent)}
        ]
      },
      {path: 'users', loadComponent:()=> import('./components/users/users.component').then(c => c.UsersComponent)},
      {path: 'tags', loadComponent:()=> import('./components/tags/tags.component').then(c => c.TagsComponent)}
    ]
  },
  {path: '**', loadComponent:()=> import('./components/not-found/not-found.component').then(c => c.NotFoundComponent)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
