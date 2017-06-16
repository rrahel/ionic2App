import {
  Component
} from '@angular/core';
import {
  NavController,
  NavParams
} from 'ionic-angular';
import {
  ListPage
} from '../list/list';
import {
  Http
} from '@angular/http';
import 'rxjs/add/operator/map';
import {
  Geolocation
} from 'ionic-native';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  private posts;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {}

  getLocation() {
    Geolocation.getCurrentPosition().then((data) => {
      var lat = data.coords.latitude;
      var lng = data.coords.longitude;
      var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + '%2C' + lng + '&language=en';
      this.http.get(GEOCODING)
        .map(res => res.json())
        .subscribe(
          data => this.event.location = data.results[0].address_components[6].long_name
        );
    });
  }

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
