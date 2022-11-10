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
  private registerUrl = 'http://localhost:3001/home/register'
  private loginUrl = 'http://localhost:3001/home/login'
  private logoutUrl = 'http://localhost:3001/home/logout'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAllCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.cardsUrl, {withCredentials: true})
  }

  getAllSets(): Observable<Set[]> {
    return this.http.get<Set[]>(this.setsUrl, {withCredentials: true})
  }

  getAllSetCards(set: string): Observable<any> {
    const setCardsUrl = `http://localhost:3001/collections/sets/${set}`
    return this.http.get(setCardsUrl, {withCredentials: true})
  }

  getSingleCard(id: string): Observable<Card> {
    const cardUrl = `http://localhost:3001/collections/my-collection/${id}`
    return this.http.get<Card>(cardUrl, {withCredentials: true})
  }

  registerUser(data: any): Observable<any> {
    return this.http.post(this.registerUrl, data);
  }

  loginUser(data: any): Observable<any> {
    return this.http.post(this.loginUrl, data, {
      withCredentials: true
    });
  }

  logout(){
    return this.http.get(this.logoutUrl);
  }

}
