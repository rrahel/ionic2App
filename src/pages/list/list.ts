import {Component} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
import { ItemDetailsPage} from '../item-details/item-details';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [DatePipe]
})
export class ListPage {
  events: any;
  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.events = navParams.get('data');
    this.selectedItem = navParams.get('event');
  }
  
  eventTapped(event) {    
    this.navCtrl.push(ItemDetailsPage, {
      event: event
    });
  }

}
