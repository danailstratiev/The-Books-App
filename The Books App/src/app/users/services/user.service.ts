import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { base_url, books_url, queryKey, firebaseApiKey, myBooksUrl } from 'src/app/shared/constants/app.constants';
import { IBook } from 'src/app/books/models/book.models';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getById(localId:string, volumeId:string):Observable<any>{
    return this.http.get<any>(`${books_url}${myBooksUrl}${localId}/${volumeId}.json${queryKey}${firebaseApiKey}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  loadVolumes(localId:string):Observable<any>{
    return this.http.get<any>(`${books_url}${myBooksUrl}${localId}.json${queryKey}${firebaseApiKey}`);
  }

  updateVolume(localId:string, volume:IBook):Observable<any>{
    return this.http.put<any>(`${books_url}${myBooksUrl}${localId}/${volume.id}.json${queryKey}${firebaseApiKey}`, JSON.stringify(volume))
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteVolume(localId:string, volumeId:string):Observable<any>{
    return this.http.delete<any>(`${books_url}${myBooksUrl}${localId}/${volumeId}.json${queryKey}${firebaseApiKey}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    location.replace('http://localhost:4200/error-page');

    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Error code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
