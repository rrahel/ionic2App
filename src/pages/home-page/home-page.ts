import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { ListPage } from '../list/list';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Notifications } from '../../app/notifications';
import {HomePageService} from './home-page-service';
import * as moment from 'moment';


@Component({
  selector: 'home-page',
  templateUrl: 'home-page.html',
  providers: [HomePageService]
})

export class HomePage implements OnInit{
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

  constructor(  private navCtrl: NavController, 
                private navParams: NavParams, 
                private http: Http, 
                private alertCtrl: AlertController, 
                private localNotifications: LocalNotifications,
                private notify: Notifications,
                private loadingController: LoadingController,
                private HomePageService: HomePageService) {}  

  ngOnInit() {
        this.HomePageService.getGpsLoc();
        this.countryList = this.HomePageService.getCountryList();

  }


  getLocation() {  
    let loader = this.loadingController.create({
      content: 'Getting your location'
    });
    loader.present();

    this.event.location = this.HomePageService.location;

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

      this.HomePageService.getHolidays(location, startDate, endDate).subscribe(
            data => {
              
              if(data.length !== 0) {
                    this.posts = data;
                    loader.dismiss();
                    this.navCtrl.push(ListPage, {data: this.posts});  
                } else {
                      loader.dismiss();
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
    // set q to the value of the searchbar
    //  
   /* let q = searchbar.target.value;

    // if the value is an empty string don't filter the items
    if (q.trim() == '') {
        return;
    }

   this.countryList.filter((v) => {
        if (v.toLowerCase().indexOf(q.toLowerCase()) > -1) {
            return true;
        }
        return false;
    })*/

    let val = searchbar.target.value;

    if (val && val.trim() != '') {
      
      // Filter the items
      this.countryList = this.countryList.filter((item) => {
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
