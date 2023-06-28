import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent:()=> import('./components/main/main.component').then(c => c.MainComponent),
    children: [
      {path: '', pathMatch: 'full', redirectTo:'home'},
      {path: 'home', canActivate:[authGuard], loadComponent:()=> import('./components/home/home.component').then(c => c.HomeComponent)},
      // {
      //   path: 'questions', canActivate:[authGuard],
      //   loadComponent:()=> import('./components/questions/questions.component').then(c => c.QuestionsComponent),
      //   children: [

      //   ]
      // },
      
      {path:'welcome', canActivate:[authGuard], component:HomepageComponent},
      {path: 'signup', canActivate:[authGuard], loadComponent:()=> import('./components/signup/signup.component').then(c => c.SignupComponent)},
      {path: 'signin', canActivate:[authGuard], loadComponent:()=> import('./components/signin/signin.component').then(c => c.SigninComponent)},
      {path: 'loading', loadComponent:()=> import('./components/loading/loading.component').then(c => c.LoadingComponent)},

      {path: 'questions', canActivate:[authGuard], loadComponent:()=> import('./components/questions/questions.component').then(c => c.QuestionsComponent), children: [
        {path: '',  loadComponent:()=> import('./components/all-questions/all-questions.component').then(c => c.AllQuestionsComponent)},
        {path: 'ask', loadComponent:()=> import('./components/ask/ask.component').then(c => c.AskComponent)},
        {path: 'q/:id', loadComponent:()=> import('./components/question-info/question-info.component').then(c => c.QuestionInfoComponent)}
      ]},
      {
        path: 'users', canActivate:[authGuard],
        loadComponent:()=> import('./components/users/users.component').then(c => c.UsersComponent),
        children: [
          {path: '', loadComponent:()=> import('./components/all-users/all-users.component').then(c => c.AllUsersComponent)},
          {path: 'u/:username', loadComponent:()=> import('./components/user-profile/user-profile.component').then(c => c.UserProfileComponent)}
          
        ]
      },
      {path: 'tags', canActivate:[authGuard], loadComponent:()=> import('./components/tags/tags.component').then(c => c.TagsComponent)}

    ]
  },
  {path: '**', loadComponent:()=> import('./components/not-found/not-found.component').then(c => c.NotFoundComponent)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
