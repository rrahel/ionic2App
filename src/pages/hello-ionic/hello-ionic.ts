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
} from '@ionic-native/geolocation';
import {
  AlertController
} from 'ionic-angular';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  private posts;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private alertCtrl: AlertController, private geolocation: Geolocation) {

  }

  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {

      var lat = resp.coords.latitude;
      var lng = resp.coords.longitude;
      var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + '%2C' + lng + '&language=en';
      this.http.get(GEOCODING)
        .map(res => res.json())
        .subscribe(
          data => this.event.location = data.results[0].address_components[6].long_name,
        );
    }).catch((error) => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: error
      });
      alert.present();
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

    this.http.get('https://murmuring-retreat-96161.herokuapp.com/api/' + location)
      .map(res => res.json()).subscribe(data => {
        this.posts = data;
        this.navCtrl.push(ListPage, {
          data: this.posts
        });
      });
  }

}
