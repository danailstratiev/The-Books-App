import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { IUserBook } from '../../models/user.models';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss']
})
export class MyBooksComponent implements OnInit {
  books:IUserBook[];
  userId:string;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService
    ) {
      this.userId = this.authService.getUserId();
    }

  ngOnInit(): void {
    this.userService.loadVolumes(this.userId)
    .subscribe(result => this.books = Object.values<IUserBook>(result)
    .map(obj => ({
      id:obj.id,
      volumeInfo:obj.volumeInfo
    })));
  }
  deleteBook(volumeId:string):void{
    event.preventDefault();
    this.userService.deleteVolume(this.userId, volumeId).subscribe(result=>{});
    window.location.reload();
  }  
}
