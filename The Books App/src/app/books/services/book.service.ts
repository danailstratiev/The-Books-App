import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/internal/operators';
import { base_url, volumesUrl, maxResults, questionQuery, orderByQuery, filterQuery, printTypeQuery } from 'src/app/shared/constants/app.constants';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  book: any;

  constructor(private http: HttpClient) { }

  get(queryString:string): Observable<any>{
    return this.http.get<any>(`${base_url}${volumesUrl}${questionQuery}${queryString}`).pipe(
      catchError(this.handleError)
    );
  }

  getById(id:string): Observable<any>{
    return this.http.get<any>(`${base_url}${volumesUrl}/${id}`)
    .pipe(tap((result) => {this.book = (result)}), 
    catchError(this.handleError)
    );
  }

  loadResults(queryString:string, queryNumber: string):Observable<any>{
    return this.http.get<any>(`${base_url}${volumesUrl}${questionQuery}${queryString}${maxResults}${queryNumber}`).pipe(
      catchError(this.handleError)
    );
  }

  sort(queryString:string, sortParameter: string):Observable<any>{
    return this.http.get<any>(`${base_url}${volumesUrl}${questionQuery}${queryString}${orderByQuery}${sortParameter}`);
  }

  filterByAccessType(queryString:string, accessType: string):Observable<any>{
    return this.http.get<any>(`${base_url}${volumesUrl}${questionQuery}${queryString}${filterQuery}${accessType}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  filterByPrintType(queryString:string, printType: string):Observable<any>{
    return this.http.get<any>(`${base_url}${volumesUrl}${questionQuery}${queryString}${printTypeQuery}${printType}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getCombinedResults(queryString:string, printType: string, accessType: string, sortParameter: string, queryNumber: string):Observable<any>{
    return this.http.get<any>(`${base_url}${volumesUrl}${questionQuery}${queryString}${printTypeQuery}${printType}${filterQuery}${accessType}${orderByQuery}${sortParameter}${maxResults}${queryNumber}`)
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
