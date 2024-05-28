import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CampusConsumerService } from '../services/campus-consumer.service';

export const AuthAdminGuard: CanActivateFn = (route, state) => {
  const router = new Router () ;
  let toastr:ToastrService=inject (ToastrService)
  const token =localStorage.getItem('token') ;
  if(token){           
    console.log(state) ;            
      let user :any = localStorage.getItem('user') ;
      user =JSON.parse(user);

     if (state.url.includes('admin')){
      const isAdmin = user.login_RoleID== 1 || user.login_RoleID == '1';
      if(isAdmin){
       
        toastr.success('Welcome to Admin Dashboard')
        router.navigate(['admin/Dashboard']);
     
        return true ;
      }else{    //user not admin 
       
        toastr.warning('This page for admin  ')
         router.navigate(['auth/login']);
    
        return false ;
      }
    }
  
  }
  else{  
    //both of consumer&provider should navigate to dashboard    
   toastr.warning('please sign up ')   ;
   router.navigate(['auth/register']) ;
   return false;
 }
};
