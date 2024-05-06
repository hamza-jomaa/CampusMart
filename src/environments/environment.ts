// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: false,

  firebaseAPI:"URL",
  backendAPI:"URL",
   firebaseConfig : {

    apiKey: "AIzaSyBOFue1R3V8HyFkbzoOzZiRSLsbHsskLrs",
  
    authDomain: "campusmart-e8217.firebaseapp.com",
  
    projectId: "campusmart-e8217",
  
    storageBucket: "campusmart-e8217.appspot.com",
  
    messagingSenderId: "960893007902",
  
    appId: "1:960893007902:web:fbed2f548ffa2b078f560f",
  
    measurementId: "G-9T4EJLJG04"
  
  }
  // const app = initializeApp(firebaseConfig);
  
  // const analytics = getAnalytics(app);
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

