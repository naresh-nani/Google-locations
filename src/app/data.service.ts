import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { throwError } from 'rxjs';
import { filter, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  result: any = [];

  constructor(private _http: Http) { }


// post the data to nodejs through the api
  send_data_to_nodejs(imageData) {
    console.log(imageData, "service File before");
    let data_t = {
      myCountry: imageData
    }
    console.log(imageData, "service File before");
    return this._http.post('http://localhost:3000/api/add', data_t)
      .map((res: any) => {
        console.log(res.json(), "nodejs returned code");
        return res.json();
      }).catch((error: any) => {
        console.log("Error");
        return throwError(error.message || error);
      });
  }


  //get date from nodejs 
  getUsers() {
    return this._http.get("http://localhost:3000/api/assign").map(result => this.result = result.json().data);
  }

}
