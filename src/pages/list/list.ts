import {Component} from '@angular/core';
import {NavController,NavParams, LoadingController} from 'ionic-angular';
import { ItemDetailsPage} from '../item-details/item-details';
import { DatePipe } from '@angular/common';
import { ListService } from './list-service';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [DatePipe, ListService]
})
export class ListPage {
  events: any;
  selectedItem: any;

  constructor(private navCtrl: NavController, 
              private navParams: NavParams, 
              private listService: ListService,
              private loadingController: LoadingController) {

    this.events = navParams.get('data');
    this.selectedItem = navParams.get('event');
  }
  
 
  eventTapped(event) {
     let loader = this.loadingController.create({
      content: 'Loading holiday'
    });
    loader.present();

    this.listService.getEvent(event._id).subscribe(
      data => {
        loader.dismiss();
        this.navCtrl.push(ItemDetailsPage, {
          event: data
        });
      }
    );    
  }

}
