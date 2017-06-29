import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { ListPage } from '../list/list';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
//import { Notifications } from '../../app/notifications';
import { Platform } from 'ionic-angular';
import {Injectable } from '@angular/core';


const API_URL = 'https://holiday-checker.herokuapp.com/api';
const API_COUNTRIES_LIST = 'https://holiday-checker.herokuapp.com/api/countries';
const GEOCODING_URL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';


@Injectable()
export class HomePageService {
  private posts;
  public validFrom = '2017-01-01';
  public validTo = '2017-04-19';
  public location = '';

  constructor(  public navCtrl: NavController, 
                public navParams: NavParams, 
                public http: Http, 
                private alertCtrl: AlertController, 
                private geolocation: Geolocation,
                private localNotifications: LocalNotifications,
                //public notify: Notifications,
                public loadingController: LoadingController,
                private platform: Platform) {}  

  public getGpsLoc() {  
      let lat, lng; 
    
      this.platform.ready().then((readySource) => {
    
        this.geolocation.getCurrentPosition().then((resp) => {

          lat = resp.coords.latitude;
          lng = resp.coords.longitude;

          //return this.http.get(GEOCODING_URL + lat + '%2C' + lng + '&language=en')
          this.http.get(`${GEOCODING_URL}${lat}%2C${lng}&language=en`)
                          .map(res => res.json())
                          .subscribe((data:any) => {
                              
                              if(data.results !== undefined && data.results !== null ) {
                                data.results.forEach( res => {
                                  res.address_components.forEach(adress => {
                                      if(adress.types[0] === 'country') {
                                        this.location = adress.long_name;
                                      }
                                  })
                                })
                              }
                            }        
                          );

        }).catch(this.handleError);
    });

  }

  public getHolidays(location, startDate, endDate): Observable<any> {
     return this.http.get(`${API_URL}/${location}/${startDate}/${endDate}`)
              .map(res => res.json());
  }


  public getCountryList(): Observable<any> {

    return this.http.get(`${API_COUNTRIES_LIST}`)
                .map(res => res.json())
  }

  handleError(error) {
      return Observable.throw(error || 'Server error');
  }





}
