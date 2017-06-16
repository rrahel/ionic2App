import {
  Component
} from '@angular/core';

import {
  NavController,
  NavParams
} from 'ionic-angular';

import {
  ItemDetailsPage
} from '../item-details/item-details';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  events: any;
  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.events = navParams.get('data');
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('event');
  }

  eventTapped(event) {
    console.log(event);
    this.navCtrl.push(ItemDetailsPage, {
      event: event
    });
  }
}
