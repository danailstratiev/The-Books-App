import { Component, OnInit, Input } from '@angular/core';
import { IBook } from '../../models/book.models';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Input() book:IBook;

  constructor() { }

  ngOnInit(): void {
  }

}
