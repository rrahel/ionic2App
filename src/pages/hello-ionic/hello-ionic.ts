import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { ListPage } from '../list/list';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Notifications } from '../../app/notifications';
import {HelloIonicService} from './hello-ionic-service';
import * as moment from 'moment';


@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html',
  providers: [HelloIonicService]
})

export class HelloIonicPage implements OnInit{
  private posts;
  public minDate = "1990-01-01";
  public maxDate = "2038-01-01";
  public event = {
    location: null,
    startDate:moment().format(),
    endDate: moment().format()
  }
  public showCountryList: boolean = false;

  public countryList = [];
  public list = [];

  constructor(  private navCtrl: NavController, 
                private navParams: NavParams, 
                private http: Http, 
                private alertCtrl: AlertController, 
                private localNotifications: LocalNotifications,
                private notify: Notifications,
                private loadingController: LoadingController,
                private helloIonicService: HelloIonicService) {}  

  ngOnInit() {
       this.helloIonicService.getGpsLoc();
       this.initializeCountriesList();
  }

  initializeCountriesList() {
       this.helloIonicService.getCountryList()
                            .subscribe(countries => this.countryList = countries);
  }

  getLocation() {  
    let loader = this.loadingController.create({
      content: 'Getting your location'
    });
    loader.present();

    this.event.location = this.helloIonicService.location;

    if (this.event.location !== '' && this.event.location !== null ) {
        loader.dismiss();
    }

  }

   submitForm() {

    let loader = this.loadingController.create({
      content: 'Loading your holidays'
    });
    loader.present();

    let location = this.event.location;
    let startDate = moment(this.event.startDate).format('YYYY-MM-DD');
    let endDate = moment(this.event.endDate).format('YYYY-MM-DD');

    if(location !== null && location !== '' && startDate !== null && endDate !== null) {

      this.helloIonicService.getHolidays(location, startDate, endDate).subscribe(
            data => {
              
              if(data.length !== 0) {
                    this.posts = data;
                    loader.dismiss();
                    this.navCtrl.push(ListPage, {data: this.posts});  
                } else {
                      let alert = this.alertCtrl.create({
                        title: 'No data available',
                        message: 'There is no data available for the requested location: ' + location + 
                        ' on the give data range: ' + startDate + ' to ' + endDate 
                      });
                      alert.present();
                } 
            }
          );

    } else {
       loader.dismiss();

       let alert = this.alertCtrl.create({
            title: 'All fields are required',
            message: 'Please fill in all the fields'
          });
        alert.present();
    }
  }

   searchCountry(searchbar) {
     //reset items
    //this.initializeCountriesList();

    let val = searchbar.target.value;
    this.list = this.countryList;
    
    if (val && val.trim() != '') {
      
      // Filter the items
     this.list = this.countryList.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      
      // Show the results
      this.showCountryList = true;
    } else {
      // hide the results when the query is empty
      this.showCountryList = false;
    }
    





  }

}
