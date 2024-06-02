import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  allMerchandiseInCart:any=0;
  token:any=localStorage.getItem('token');
  isProvider:any=false;
  constructor(private cartService: CartService, private profileService:ProfileService) { }

  ngOnInit(): void {

    this.cartService.currentData.subscribe((data) => {
      this.allMerchandiseInCart = data.length;
      
  });
     this.profileService.userData$.subscribe(res=>{
      this.isProvider=res.isprovider;
     })
}
logout(){
  localStorage.clear();
}
}
