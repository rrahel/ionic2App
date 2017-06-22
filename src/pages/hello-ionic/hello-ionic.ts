import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { ListPage } from '../list/list';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Notifications } from '../../app/notifications';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})

export class HelloIonicPage {
  private posts;
  public minDate = "1990-01-01";
  public maxDate = "2038-01-01";

  constructor(  public navCtrl: NavController, 
                public navParams: NavParams, 
                public http: Http, 
                private alertCtrl: AlertController, 
                private geolocation: Geolocation,
                private localNotifications: LocalNotifications,
                public notify: Notifications,
                public loadingController: LoadingController

  ) {  
  }  

  getLocation() {   
    let loader = this.loadingController.create({
      content: "Getting your location"
    });
    loader.present();
    
    this.geolocation.getCurrentPosition().then((resp) => {

      var lat = resp.coords.latitude;
      var lng = resp.coords.longitude;
      var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + '%2C' + lng + '&language=en';
      this.http.get(GEOCODING)
        .map(res => res.json())
        .subscribe(
          data => {
            loader.dismiss(),
            this.event.location = data.results[0].address_components[6].long_name
          }         
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
    let loader = this.loadingController.create({
      content: "Loading your holidays"
    });
    loader.present();
    let location = this.event.location;
    let startDate = this.event.startDate;
    let endDate = this.event.endDate;

    this.http.get('https://murmuring-retreat-96161.herokuapp.com/api/' + location)
      .map(res => res.json()).subscribe(
        data => {
          this.posts = data,
          loader.dismiss(),
          this.navCtrl.push(ListPage, {data: this.posts})        
        }
      );
  }

}
