import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyBooksComponent } from './components/my-books/my-books.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { BooksModule } from '../books/books.module';



@NgModule({
  declarations: [MyBooksComponent, BookFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    BooksModule
  ],
  exports: [MyBooksComponent, BookFormComponent]
})
export class UsersModule { }
