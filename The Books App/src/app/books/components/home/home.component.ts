import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchForm: FormGroup;
  searchedItem:string;

  constructor(
    private bookService: BookService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchQuery: ['']
    });
  }

  findBooks(queryString:string):void{
    if (queryString && queryString.length) {
      sessionStorage.setItem(this.searchedItem,queryString)
      this.router.navigate(['found']);
    }else{
      this.router.navigate(['error-page']);
    }
  }
}
