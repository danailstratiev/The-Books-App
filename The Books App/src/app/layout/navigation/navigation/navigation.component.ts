import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  userId:string;

  constructor(
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();   
  }

  logout():void {
    this.authService.logout();
  }

  openNav():void {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  closeNav():void {
    document.getElementById("mySidenav").style.width = "0";
  }
}
