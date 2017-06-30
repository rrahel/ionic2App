import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';
import { ListService } from './list-service';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [ListService], 
})
export class ListPage {
  events: any;
  selectedItem: any;

  constructor(private navCtrl: NavController, private navParams: NavParams, private listService: ListService) {
    this.events = navParams.get('data');
    this.selectedItem = navParams.get('event');
  }
  
  eventTapped(event) {

    this.listService.getEvent(event._id).subscribe(
      data => {
        this.navCtrl.push(ItemDetailsPage, {
          event: data
        });
      }
    );    
  }
}
