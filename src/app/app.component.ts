import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { filter } from 'rxjs/operators';
//import { AngularFireDatabase } from '@angular/fire/compat/database';
declare let $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        Location, {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        }
    ]
})
export class AppComponent implements OnInit {
    location: any;
    routerSubscription: any;

    constructor(private router: Router) {
    }
    lat: any;
    lng: any;
    map :any;
    private ShowLocation(position: any, map: any): void {
        this.lng = +position.coords.longitude;
        this.lat = +position.coords.latitude;
        sessionStorage.setItem('LAT', position.coords.latitude);
        sessionStorage.setItem('LONG', position.coords.longitude);
    }
    ngOnInit(){

        this.recallJsFuntions();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              this.ShowLocation(position, this.map);
            });
          } else {
            alert("Geolocation is not supported by this browser.");
          }      
    }

    recallJsFuntions() {
        this.router.events
        .subscribe((event) => {
            if ( event instanceof NavigationStart ) {
                $('.loader').fadeIn('slow');
            }
        });
        this.routerSubscription = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel))
        .subscribe(event => {
            $.getScript('../assets/js/custom.js');
            $('.loader').fadeOut('slow');
            this.location = this.router.url;
            if (!(event instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });
    }
}