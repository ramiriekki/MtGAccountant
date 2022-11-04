import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from './card';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private cardsUrl = 'http://localhost:3001/collections/my-collection'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAllCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.cardsUrl)
  }

  getSingleCard(id: string): Observable<Card> {
    const cardUrl = `http://localhost:3001/collections/my-collection/${id}`
    return this.http.get<Card>(cardUrl)
  }

}
