import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from '../models/Card';
import { Collection } from '../models/Collection';
import { CollectionCard } from '../models/CollectionCard';
import { UpdateData } from '../models/UpdateData';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  url = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllCards(): Observable<Card[]>{ // TODO get collection instead of all cards
    return this.httpClient.get<Card[]>(this.url + "/api/cards/all-cards")
  }

  getCollection(): Observable<CollectionCard[]>{
    return this.httpClient.get<Collection>(this.url + `/api/collections/collection?email=${localStorage.getItem('user')}`).pipe(
      map(c => c.cards));
  }

  getCard(id:string): Observable<Card>{
    return this.httpClient.get<Card>(this.url + `/api/cards/card?cardId=${id}`)
  }

  updateCollection(removeArr: string[], addArr: any[]){
    //let data: UpdateData
    
    const data = { id_list: addArr, remove_list: removeArr};

    // console.log(localStorage.getItem('user'));
    console.log(data);
    console.log(this.url + `/api/collections/collection?email=${localStorage.getItem('user')}`);
    
    try {
      // TODO check server side api/collections/collection?email=test.test@gmail.com
      return this.httpClient.post(this.url + `/api/collections/collection?email=${localStorage.getItem('user')}`, data, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }).subscribe()
    } catch (error) {
      console.log(error);
      return null
    }
  }
}
