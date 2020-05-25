import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FoundBooksComponent } from './components/found-books/found-books.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { RouterModule } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { SaleFactorPipe } from './pipes/book-details.pipe';



@NgModule({
  declarations: [HomeComponent, FoundBooksComponent, BookDetailsComponent, BookComponent, SaleFactorPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule 
  ],
  exports: [HomeComponent, FoundBooksComponent, BookDetailsComponent, BookComponent, SaleFactorPipe]
})
export class BooksModule { }
