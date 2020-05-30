import { Component, OnInit, Input } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { IBook } from '../../models/book.models';
import { catchError } from 'rxjs/internal/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-found-books',
  templateUrl: './found-books.component.html',
  styleUrls: ['./found-books.component.scss']
})
export class FoundBooksComponent implements OnInit {
  foundBooks:IBook[];
  searchWord:string;
  searchedItem:string;
  resultsPerPage:string;
  sortParameter:string;
  accessType:string;
  printType:string;
  errorLocation:string = 'http://localhost:4200/error-page';

  constructor(
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.searchWord = sessionStorage.getItem(this.searchedItem);

    this.bookService.get(this.searchWord)
    .subscribe(result => {
      try {
        this.foundBooks = Object.values<IBook[]>(result)[2]
        .map(obj => ({
          id:obj.id,
          volumeInfo:obj.volumeInfo,
          saleInfo: obj.saleInfo,
          accessInfo: obj.accessInfo
    }))
      } catch (error) {
        this.router.navigate(['error-page']);
      }
    });
  }

  handleResults(){
    this.resultsPerPage = (document.getElementById('searchResults')as HTMLSelectElement).value;
    this.bookService.loadResults(this.searchWord,this.resultsPerPage)
    .subscribe(result => {
      try {
        this.foundBooks = Object.values<IBook[]>(result)[2]
        .map(obj => ({
          id:obj.id,
          volumeInfo:obj.volumeInfo,
          saleInfo: obj.saleInfo,
          accessInfo: obj.accessInfo
    }))
      } catch (error) {
        this.router.navigate(['error-page']);
      }
    });
  }

  orderBy(){
    this.sortParameter = (document.getElementById('orderBy')as HTMLSelectElement).value;
    this.bookService.sort(this.searchWord,this.sortParameter)
    .subscribe(result => {
      try {
        this.foundBooks = Object.values<IBook[]>(result)[2]
        .map(obj => ({
          id:obj.id,
          volumeInfo:obj.volumeInfo,
          saleInfo: obj.saleInfo,
          accessInfo: obj.accessInfo
    }))
      } catch (error) {
        this.router.navigate(['error-page']);
      }
    });
  }

  filterByAccess(){
    this.accessType = (document.getElementById('accessType')as HTMLSelectElement).value;
    this.bookService.filterByAccessType(this.searchWord,this.accessType)
    .subscribe(result => {
      try {
        this.foundBooks = Object.values<IBook[]>(result)[2]
        .map(obj => ({
          id:obj.id,
          volumeInfo:obj.volumeInfo,
          saleInfo: obj.saleInfo,
          accessInfo: obj.accessInfo
    }))
      } catch (error) {
        this.router.navigate(['error-page']);
      }
    });
  }

  filterByPrinting(){
    this.printType = (document.getElementById('printType')as HTMLSelectElement).value;
    this.bookService.filterByPrintType(this.searchWord, this.printType)
    .subscribe(result => {
      try {
        this.foundBooks = Object.values<IBook[]>(result)[2]
        .map(obj => ({
          id:obj.id,
          volumeInfo:obj.volumeInfo,
          saleInfo: obj.saleInfo,
          accessInfo: obj.accessInfo
    }))
      } catch (error) {
        this.router.navigate(['error-page']);
      }
    });
  }

  combineParameters(){
    this.printType = (document.getElementById('printType')as HTMLSelectElement).value;
    this.accessType = (document.getElementById('accessType')as HTMLSelectElement).value;
    this.sortParameter = (document.getElementById('orderBy')as HTMLSelectElement).value;
    this.resultsPerPage = (document.getElementById('searchResults')as HTMLSelectElement).value;
    
    this.bookService.getCombinedResults(this.searchWord, this.printType, 
        this.accessType, this.sortParameter, this.resultsPerPage)
        .subscribe(result => {
          try {
            this.foundBooks = Object.values<IBook[]>(result)[2]
            .map(obj => ({
              id:obj.id,
              volumeInfo:obj.volumeInfo,
              saleInfo: obj.saleInfo,
              accessInfo: obj.accessInfo
        }))
          } catch (error) {
            this.router.navigate(['error-page']);
          }
        });
  }
}
