import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/components/login/login.component';
import { HomeComponent } from './books/components/home/home.component';
import { FoundBooksComponent } from './books/components/found-books/found-books.component';
import { BookDetailsComponent } from './books/components/book-details/book-details.component';
import { MyBooksComponent } from './users/components/my-books/my-books.component';
import { BookFormComponent } from './users/components/book-form/book-form.component';
import { AuthGuard } from './authentication/guards/auth.guard';
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';


const routes: Routes = [
  {
    path: 'signin', 
    component: LoginComponent,
    canActivate: [AuthGuard],
    data:{
      isLogged:false
    }        
  },
  {
    path: 'home', 
    component: HomeComponent    
  },
  {
    path: 'found', 
    component: FoundBooksComponent    
  },
  {
    path: 'book-details/:id', 
    component: BookDetailsComponent    
  },
  {
    path: 'my-books', 
    component: MyBooksComponent,
    canActivate: [AuthGuard],
    data:{
      isLogged:true
    },    
  },
  {
    path: 'book-form', 
    component: BookFormComponent,
    canActivate: [AuthGuard],
    data:{
      isLogged:true
    },    
  },
  {
    path: 'book-form/:id', 
    component: BookFormComponent,
    canActivate: [AuthGuard],
    data:{
      isLogged:true
    },    
  },
  {
    path: 'error-page', 
    component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
