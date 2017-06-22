import {
  AlertController
} from 'ionic-angular';
import {
  LocalNotifications
} from '@ionic-native/local-notifications';
import {
  Platform
} from 'ionic-angular';
import {Injectable } from '@angular/core';

import { Http } from '@angular/http';

@Injectable()
export class Notifications {
    private posts;
    constructor(private alertCtrl: AlertController, private localNotifications: LocalNotifications, private plt: Platform, public http: Http) {        

    }

    createNotifications(){
        let now = new Date();
        // this.http.get('https://murmuring-retreat-96161.herokuapp.com/api/' + location + '/' + now + '/' + new Date(now + 1*30*24*60*60*1000))
        // .map(res => res.json()).subscribe(data => {
        //     this.posts = data;            
        // });

        this.localNotifications.cancelAll();

        this.localNotifications.schedule({
            id: 1,
            title: 'Attention',
            text: 'Notification',
            data: { mydata: 'My hidden message this is' },
            at: new Date(new Date().getTime() + 10 * 1000)            
        });
        
        
        this.localNotifications.on('click', (notification, state) => {
            let json = JSON.parse(notification.data);
        
            let alert = this.alertCtrl.create({
                title: notification.title,
                subTitle: json.mydata
            });
            alert.present();
        })

        
    }

}
