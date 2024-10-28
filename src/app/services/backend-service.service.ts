import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



const data='data/'

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {

  constructor(private http: HttpClient) { }


getMenu():Observable<any>{
  return this.http.get(data+"menu.json");
}

getBurger():Observable<any>{
  return this.http.get(data+"burger.json");
}

getSandwich():Observable<any>{
  return this.http.get(data+"sandwich.json");
}

getSalat():Observable<any>{
  return this.http.get(data+"salate.json");
}

getGetraenk():Observable<any>{
  return this.http.get(data+"drink.json");
}

getBeilage():Observable<any>{
  return this.http.get(data+"beilagen.json");
}

}
