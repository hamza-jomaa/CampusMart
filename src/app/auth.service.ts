import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFireDatabase } from "@angular/fire/compat/database";
@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(private router: Router, private fireAuth: AngularFireAuth,private db:AngularFireDatabase) {}

    Login(email: any, password: any) {
        this.fireAuth.signInWithEmailAndPassword(email, password).then(
            (res) => {
                console.log("res", res);
                localStorage.setItem("token", "true");
                if(res.user?.emailVerified==true){
                  
                  this.router.navigate(["/"]);
                }else {
                  this.router.navigate(["/verify-email"]);
                }
                
            },
            (err) => {
                alert("something went wrong");
                this.router.navigate(["/login"]);
            }
        );
    }
    register(username:any,email: any, password: any) {
      
        this.fireAuth.createUserWithEmailAndPassword(email, password).then(
            (res) => {
              //console.log('username',{id:res.user.uid,name:username})
              this.db.object('users/consumers').set({id:res.user.uid,name:username})
                this.router.navigate(["/login"]);
                this.sendEmailVerification(res.user)
            },
            (err) => {
                alert(err.message);
                this.router.navigate(["/signup"]);
            }
        );
    }
    logout() {
        this.fireAuth.signOut().then(
            () => {
                localStorage.removeItem("token");
                this.router.navigate(["/login"]);
            },
            (err) => {
                alert(err.message);
            }
        );
    }
    forgotPassword(email: any) {
        this.fireAuth.sendPasswordResetEmail(email).then(
            () => {
                this.router.navigate(["/verify-email"], { queryParams: { forgotPassword: true } });
            },
            (err) => {
                alert("Something went wrong");
            }
        );
    }
    sendEmailVerification(user:any){
      user.sendEmailVerification().then((res:any)=>{
        this.router.navigate(['/verify-email'], { queryParams: { registration: true } });
      }, (err) => {
        alert("Something went wrong");
    })
    }
    isLoggedIn() {
        return localStorage.getItem('token') === 'true';
      }
      
}
