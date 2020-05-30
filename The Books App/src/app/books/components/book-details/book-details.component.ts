import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { IBook } from '../../models/book.models';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book:IBook;
  link:string;
  description:string;
  
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
  ) {}

  ngOnInit(): void {
    this.bookService.getById(this.route.snapshot.params.id).subscribe(() => 
      this.book = this.bookService?.book,
    );
    this.bookService.getById(this.route.snapshot.params.id).subscribe(() => 
      this.link = this.bookService?.book?.accessInfo?.pdf?.acsTokenLink
    );
    this.bookService.getById(this.route.snapshot.params.id).subscribe(() => 
      this.description = this.bookService?.book?.volumeInfo?.description?.replace(/(<([^>]+)>)/ig, '')
    );
  }
}
