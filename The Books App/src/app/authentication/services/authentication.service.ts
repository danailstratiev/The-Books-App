import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequestModel } from '../models/authentication.models';
import { authApiUrl, accountsPath, queryKey, firebaseApiKey, webToken, userId } from 'src/app/shared/constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  loggedUser:any;
  homePageUrl:string = 'http://localhost:4200/home';
  constructor(
    private http: HttpClient,
  ) { }

  authenticate(model: LoginRequestModel): void {
    event.preventDefault();
    this.http.post(`${authApiUrl}${accountsPath}${queryKey}${firebaseApiKey}`, 
        JSON.stringify(model)).subscribe((response: any) => {
        localStorage.setItem(webToken, response.idToken);
        localStorage.setItem(userId, response.localId);
        location.replace(this.homePageUrl);
    });
  }

  logout():void{
    localStorage.removeItem(webToken);
    localStorage.removeItem(userId);
    (document.getElementById('signOut').style.display = 'none');
    sessionStorage.clear();
    location.replace(this.homePageUrl);
  }

  getToken(): string {
    return localStorage.getItem(webToken);
  }

  getUserId(): string {
    return localStorage.getItem(userId);
  }
}
