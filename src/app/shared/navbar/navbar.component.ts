import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  allMerchandiseInCart:any=0;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {

    this.cartService.currentData.subscribe((data) => {
      this.allMerchandiseInCart = data.length;
      
  });
     
}
}
