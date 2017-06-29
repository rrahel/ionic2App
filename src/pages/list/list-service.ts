import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import {Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

const API_URL = 'https://holiday-checker.herokuapp.com/api';
const EVENT_DETAILS = 'event-details';

@Injectable()
export class ListService {

      constructor(                 
                public http: Http, 
                private platform: Platform) {}  
    

    public getEvent(eventId): Observable<any> {
        return this.http.get(`${API_URL}/${EVENT_DETAILS}/${eventId}`)
            .map(res => res.json());
    }

}

