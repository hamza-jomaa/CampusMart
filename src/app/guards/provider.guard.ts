import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { CampusConsumerService } from '../services/campus-consumer.service';

@Injectable({
  providedIn: 'root'
})
export class providerGuard implements CanActivate {

  constructor(
    private consumerService: CampusConsumerService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    const token = localStorage.getItem('token');
    const roleId = localStorage.getItem('login_RoleID');
    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);
    

    if (token ) {
      const isRoleIdValid = user.login_RoleID == 2 || user.login_RoleID == '2';
      if(isRoleIdValid){   return this.consumerService.getConsumerById(user.login_ConsumerID).pipe(
        map((res: any) => {
          const isprovider = res.isprovider;
          if (isprovider == 1 || isprovider == '1') {
            this.toastr.success('Welcome to provider consumer Dashboard');
            return true;
          } else {
            this.toastr.error('You are not a provider');
            this.router.navigate(['']);
            return false;
          }
        }),
        catchError((error: any) => {
          this.toastr.error('Error Occurred');
          this.router.navigate(['']);
          return of(false);
        })
      );}
   
      else{this.toastr.error('You are not a providet, login or register first');
      this.router.navigate(['auth/login']);
      return false;}
    } else {
      this.toastr.error('You are not a user, login or register first');
      this.router.navigate(['auth/login']);
      return false;
    }
  }
}
