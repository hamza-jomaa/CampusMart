// // trackorder.component.spec.ts

// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { TrackorderComponent } from './trackorder.component';

// declare var google: any;

// describe('TrackorderComponent', () => {
//   let component: TrackorderComponent;
//   let fixture: ComponentFixture<TrackorderComponent>;

//   beforeAll(() => {
//     // Mock the google namespace
//     global.google = {
//       maps: {
//         Map: class {
//           static DEMO_MAP_ID = 'mock_demo_map_id';
//         },
//         LatLngLiteral: class {},
//         MapMouseEvent: class {
//           latLng = {
//             lat: () => 0,
//             lng: () => 0,
//             toJSON: () => ({ lat: 0, lng: 0 })
//           }
//         }
//       }
//     };
//   });

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [TrackorderComponent]
//     });
//     fixture = TestBed.createComponent(TrackorderComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
