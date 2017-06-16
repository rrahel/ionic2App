import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListPage } from '../list/list';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from 'ionic-native';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  private posts;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private alertCtrl: AlertController) {
    if (navigator.geolocation) {
      var options = {
        enableHighAccuracy: true
      };

      navigator.geolocation.getCurrentPosition(position=> {
        console.info('using navigator');
        console.info(position.coords.latitude);
        console.info(position.coords.longitude);
      }, error => {
        console.log(error);
      }, options);
    }
  }

  // getLocation() {
  //   console.log('----------9999----');
  //    var options = {
  //     enableHighAccuracy: true,
  //     timeout: 5000,
  //     maximumAge: 0
  //   };
  //   Geolocation.getCurrentPosition(options).then((data) => {
  //     var lat = data.coords.latitude;
  //     var lng = data.coords.longitude;
  //     var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + '%2C' + lng + '&language=en';
  //     this.http.get(GEOCODING)
  //       .map(res => res.json())
  //       .subscribe(
  //         data => this.event.location = data.results[0].address_components[5].long_name
  //       );
  //   }).catch((err)=> {
  //     let alert = this.alertCtrl.create({
  //       title: 'Error',
  //       message: err
  //     });
  //     alert.present();
  //   });
    
  // }

// getLocation() {
//   console.log('func')
//    var options = {
//       enableHighAccuracy: true,
//       maximumAge: 3600000
//    }

//    var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
//    console.log(watchID)
//    function onSuccess(position) {
//     console.log('success')
//      let alert = this.alertCtrl.create(
//           'Latitude: '          + position.coords.latitude          + '\n' +
//          'Longitude: '         + position.coords.longitude         + '\n' +
//          'Altitude: '          + position.coords.altitude          + '\n' +
//          'Accuracy: '          + position.coords.accuracy          + '\n' +
//          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
//          'Heading: '           + position.coords.heading           + '\n' +
//          'Speed: '             + position.coords.speed             + '\n' +
//          'Timestamp: '         + position.timestamp                + '\n'
//     );
//     alert.present();
//    };

//    function onError(error) {
//       alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
//    }
// }






  public event = {
    location: '',
    startDate: '2017-04-19',
    endDate: '2017-04-19',
  }

  submitForm() {
    console.log(this.event);
    let location = this.event.location;
    let startDate = this.event.startDate;
    let endDate = this.event.endDate;

    this.http.get('http://localhost:5000/' + location)
      .map(res => res.json()).subscribe(data => {
        this.posts = data;
        console.log('http://localhost:5000/' + location);
        this.navCtrl.push(ListPage, {
          data: this.posts
        });
      });


    // this.http.get('http://10.15.204.226:3000/holidayslist/'+ this.event.location+'/'+ this.event.startDate +'/'+ this.event.endDate )
    //     .map(res => res.json()).subscribe(data => {
    //     this.posts = data;
    //     console.log('http://10.15.204.226:3000/holidayslist/'+ this.event.location+'/'+ this.event.startDate +'/'+ this.event.endDate);
    // });
    // console.log('http://10.15.204.226:3000/holidayslist/'+ this.event.location+'/'+ this.event.startDate +'/'+ this.event.endDate);


  }

}
