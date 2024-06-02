import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProfileService } from 'src/app/services/profile.service';


@Component({
  selector: 'app-navbar-style-two',
  templateUrl: './navbar-style-two.component.html',
  styleUrls: ['./navbar-style-two.component.scss']
})
export class NavbarStyleTwoComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName: string = '';
  allMerchandiseInCart:any=0;
  token:any=localStorage.getItem('token');
  isProvider:any=false;
  constructor(private cartService: CartService, private profileService:ProfileService) { }

  ngOnInit(): void {

    this.cartService.currentData.subscribe((data) => {
      this.allMerchandiseInCart = data.length;
      
  });
  this.profileService.userData$.subscribe(res=>{
    console.log("res",res)
    this.isProvider=res.isprovider;
   })
 
  }
  logout(){
    localStorage.clear();
  }
}
