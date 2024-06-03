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
     
      
      
     if (token) {
      const roleid=user.login_RoleID== 2 || user.login_RoleID == '2';
      if(roleid){
      this.toastr.success('Welcome to campus consumer Dashboard')   
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

