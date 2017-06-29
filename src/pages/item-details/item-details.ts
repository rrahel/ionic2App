import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;
  constructor(private navCtrl: NavController, private navParams: NavParams, private sanitizer: DomSanitizer) {
    this.selectedItem = navParams.get('event');
  }

  getBackground(){
     return this.sanitizer.bypassSecurityTrustStyle(`url(data:image/png;base64,${this.selectedItem.image.base64})`);
  }
}
