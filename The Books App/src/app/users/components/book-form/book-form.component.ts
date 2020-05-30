import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/internal/operators';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  // bookForm:FormGroup = new FormGroup({
  //   id: new FormControl('', [Validators.required, Validators.required, Validators.minLength(6)]),
  //   volumeInfo: new FormGroup({
  //     title: new FormControl('', [Validators.required, Validators.required, Validators.minLength(3)]),
  //     authors: new FormArray([
  //       new FormControl('', [Validators.required, Validators.required, Validators.minLength(3)]),
  //     ]),
  //     publisher: new FormControl('',[Validators.required, Validators.required, Validators.minLength(3)]),
  //     publishedDate: new FormControl('',[Validators.required, Validators.required, Validators.minLength(3)]),
  //     pageCount: new FormControl('',[Validators.required, Validators.required]),
  //     imageLinks: new FormGroup({
  //       thumbnail:new FormControl('', [Validators.required]),
  //     })
  //   })
  // });
  bookForm:FormGroup;
  userId:string

  constructor(
    private fb: FormBuilder,
    private route:ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: AuthenticationService
    ) { 
      this.userId = this.authService.getUserId();
      this.bookForm = this.fb.group({
        id: ['', [Validators.required, Validators.minLength(3)]],
        volumeInfo: this.fb.group({
          title:['', [Validators.required, Validators.required, Validators.minLength(3)]],
          authors: this.fb.array([
            this.fb.control('')
          ]),
          publisher:['', [Validators.required, Validators.required, Validators.minLength(3)]],
          publishedDate:['', [Validators.required, Validators.required, Validators.minLength(4)]],
          pageCount:['', [Validators.required]],
          imageLinks: this.fb.group({
            thumbnail:['', [Validators.required]]
          })
        })
    });
    }

  ngOnInit(): void {
    const param: string = this.route.snapshot.paramMap.get('id');
    
    if (param) {
        this.userService.getById(this.userId, param).subscribe(response => {
            this.bookForm.patchValue(response);
        });
    }
  }
  get authors():FormArray {
    return this.bookForm.get('volumeInfo').get('authors') as FormArray;
  }
  
  addAuthors():void {
    this.authors.push(this.fb.control(''));
  }

  removeAuthors():void {
    if (this.authors.length > 1) {
      this.authors.removeAt(this.authors.length - 1);
    }
  }

  submitEditBookForm(): void {
    this.userService.updateVolume(this.userId,this.bookForm.value).pipe(take(1)).subscribe(response => {
        this.router.navigate(['/my-books']);
    });
  }  
}
