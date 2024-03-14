import { Component ,OnInit} from '@angular/core';

@Component({
  selector: 'app-trackorder',
  templateUrl: './trackorder.component.html',
  styleUrls: ['./trackorder.component.scss']
})
export class TrackorderComponent implements OnInit{
constructor(){}
markers: any[] = [];
location: any[] = [sessionStorage.getItem('LAT'), sessionStorage.getItem('LONG')];
ngOnInit(): void {
  this.markers = [
    {
      position: { lat: parseInt(this.location[0]), lng: parseInt(this.location[1]) },
      visible: true,
      opacity: 1,

      title: 'You',
      options: {
        draggable: true,
        icon: '../assets/img/loc1.png'
      }
    },
    // {
    //   position: { lat: this.data.latitude, lng: this.data.longitude },
    //   visible: true,
    //   opacity: 1,

    //   title: this.data.name,
    //   options: {
    //     draggable: false,
    //     icon: '../assets/img/loc2.png'
    //   }
    // }
  ]
}
display:any;
center: google.maps.LatLngLiteral={lat :32.494162 , lng :35.991040 };
zoom=14;
moveMap(event: google.maps.MapMouseEvent){
  if(event.latLng!=null)
  this.center=(event.latLng.toJSON());
}
move(event:google.maps.MapMouseEvent){
  if(event.latLng!=null)
  this.display=event.latLng.toJSON();

}



}
