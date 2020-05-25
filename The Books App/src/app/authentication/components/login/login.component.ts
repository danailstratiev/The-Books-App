import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { LoginRequestModel } from '../../models/authentication.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public emailRegex:RegExp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g;

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
    document.getElementById('myAccount').style.display = '';
  }

  submitLoginForm(email:string, password:string) :void{
    let loginModel:LoginRequestModel = {
        email,
        password
    }    
    document.getElementById('myAccount').style.display = 'none';

    this.authService.authenticate(loginModel);
  }
}
