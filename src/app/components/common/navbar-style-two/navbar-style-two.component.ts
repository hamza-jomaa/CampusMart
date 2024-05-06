import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-navbar-style-two',
  templateUrl: './navbar-style-two.component.html',
  styleUrls: ['./navbar-style-two.component.scss']
})
export class NavbarStyleTwoComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName: string = '';
  constructor(private authService: AuthService) { }

  ngOnInit(): void {

      this.isLoggedIn =this.authService.isLoggedIn();
      if (this.isLoggedIn) {
        // Fetch user's name here if needed
      //  this.userName = this.authService.getUserName(); // Assuming a method to fetch user name
      }
 
  }
  logout() {
    this.authService.logout();
  }
}
