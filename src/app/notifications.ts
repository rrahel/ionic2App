import {
  AlertController
} from 'ionic-angular';
import {
  LocalNotifications
} from '@ionic-native/local-notifications';
import {
  Platform
} from 'ionic-angular';
import {
  Injectable
} from '@angular/core';
import {
  Http
} from '@angular/http';
import * as moment from 'moment';
import 'rxjs/add/operator/map';
import {
  Geolocation
} from '@ionic-native/geolocation';



const API_URL = 'https://holiday-checker.herokuapp.com/api';
const GEOCODING_URL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';

@Injectable()
export class Notifications {
  private location = '';

  constructor(private platform: Platform, private geolocation: Geolocation, private alertCtrl: AlertController, private localNotifications: LocalNotifications, private plt: Platform, public http: Http) {

  }

  public createNotifications() {
    let now = moment(new Date()).format('YYYY-MM-DD');
    let endDate = moment(now).add('days', 60).format('YYYY-MM-DD');
    let time = new Date(new Date().getTime() + 5 * 1000);
    let index = 0;

    console.log(API_URL + '/' + this.location + '/' + now + '/' + endDate);
    this.http.get(API_URL + '/' + this.location + '/' + now + '/' + endDate)
      .map(res => res.json()).subscribe(data => {
        data.forEach(element => {

          this.localNotifications.schedule({
            id: index,
            title: 'Holiday',
            text: element.englishName,
            data: {
              eventCountry: element.country,
              eventTitle: element.englishName,
              eventDate: moment(element.isoDate).format('DD.MM.YYYY')
            },
            at: time
          });
          index++;
        });
      });

    this.localNotifications.on('click', (notification, state) => {
      let json = JSON.parse(notification.data);
      console.log(json);
      let alert = this.alertCtrl.create({
        title: 'Holiday Checker',
        subTitle: json.eventTitle,
        message: json.eventCountry + '<br>' + json.eventDate
      });
      alert.present();
    })
  }



  public getLocation() {
    let lat, lng;


      this.geolocation.getCurrentPosition().then((resp) => {

        lat = resp.coords.latitude;
        lng = resp.coords.longitude;

        //return this.http.get(GEOCODING_URL + lat + '%2C' + lng + '&language=en')
        this.http.get(`${GEOCODING_URL}${lat}%2C${lng}&language=en`)
          .map(res => res.json())
          .subscribe((data: any) => {

            if (data.results !== undefined && data.results !== null) {
              data.results.forEach(res => {
                res.address_components.forEach(adress => {
                  if (adress.types[0] === 'country') {
                    this.location = adress.long_name;                    
                  }
                })
              })
            }

            if(this.location != '') {
                this.createNotifications();
            }
          });

      })
  }

}
