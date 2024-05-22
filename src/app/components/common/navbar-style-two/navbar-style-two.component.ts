import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-navbar-style-two',
  templateUrl: './navbar-style-two.component.html',
  styleUrls: ['./navbar-style-two.component.scss']
})
export class NavbarStyleTwoComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName: string = '';
  allMerchandiseInCart:any=0;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {

    this.cartService.currentData.subscribe((data) => {
      this.allMerchandiseInCart = data.length;
      
  });
     
 
  }
  logout() {
   // this.authService.logout();
  }
}
