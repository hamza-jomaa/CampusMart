import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const router:Router = new Router();
 const toastr:ToastrService= inject(ToastrService)
  console.log(state);
  const token = localStorage.getItem('token'); 
  if(token)
  {
    if(state.url.indexOf('admin'))
    {
      let user:any = localStorage.getItem('user'); 
      user= JSON.parse(user); 
      if(user.name=='Dana')
        {
          toastr.success('Welcome in the admin dashboard')
          return true; 
        }
        //user is customer
        else {
          toastr.warning('This page for the Admin')
          router.navigate(['security/login'])
            return false ; 

        }

    }
    return true;
  }
  //For the guest user 
  else 
  { toastr.warning('you are not Authorized ')
  router.navigate(['security/register'])
    return false ; 
  }
 



};
