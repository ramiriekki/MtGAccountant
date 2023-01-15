import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from '../models/Card';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  url = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllCards(): Observable<Card[]>{
    return this.httpClient.get<Card[]>(this.url + "/api/cards/all-cards")
  }
}
