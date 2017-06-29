import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home-page/home-page';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { Geolocation } from '@ionic-native/geolocation';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Notifications } from './notifications';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ItemDetailsPage,
    ListPage
],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ItemDetailsPage,
    ListPage
  ],
  providers: [
      {
        provide: ErrorHandler, 
        useClass: IonicErrorHandler
      }, 
      Geolocation,
      LocalNotifications,
      Notifications
    ]
})
export class AppModule {}
