import { Injectable } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'; // Adjust the path as necessary
import { ToastrService } from 'ngx-toastr';
import { CampusConsumerService } from '../services/campus-consumer.service';

@Injectable({
  providedIn: 'root'
})
export class consumerGuard implements CanActivate {

  constructor(private consumerService: CampusConsumerService, private router: Router, private toastr:ToastrService) {
   
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   
      const token = localStorage.getItem('token');
      const roleId = localStorage.getItem('login_RoleID');
      let user :any = localStorage.getItem('user') ;
      user =JSON.parse(user);
     
      //const consumer=this.consumerService.GetCampusConsumerId(user.login_ConsumerID)
    //  console.log(consumer)
      //const provider=this.consumerService.checkIsProvider()
      
     if (token) {
      const roleid=user.login_RoleID== 2 || user.login_RoleID == '2';
      if(roleid){console.log(user.login_ConsumerID)
      this.toastr.success('Welcome to campus consumer Dashboard')
      // this.router.navigate(['coming-soon']);
   
      return true ;
     }
     else{
      this.toastr.error('You are not consumer,login or register before')
      this.router.navigate(['auth/login']);
      return false;
     }
    }
    
       else {
        this.toastr.error('You are not consumer,login or register before')
        this.router.navigate(['auth/login']);
        return false;
      }
  
  
    
    }}

