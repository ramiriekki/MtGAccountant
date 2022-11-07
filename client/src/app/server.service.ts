import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from './card';
import { Set } from './set';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private cardsUrl = 'http://localhost:3001/collections/my-collection'
  private setsUrl = 'http://localhost:3001/collections/sets'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAllCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.cardsUrl)
  }

  getAllSets(): Observable<Set[]> {
    return this.http.get<Set[]>(this.setsUrl)
  }

  getAllSetCards(set: string): Observable<any> {
    const setCardsUrl = `http://localhost:3001/collections/sets/${set}`
    return this.http.get(setCardsUrl)
  }

  getSingleCard(id: string): Observable<Card> {
    const cardUrl = `http://localhost:3001/collections/my-collection/${id}`
    return this.http.get<Card>(cardUrl)
  }

}
