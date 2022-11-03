import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private cardsUrl = 'http://localhost:3001/collections/my-collection'

  constructor(private http: HttpClient) { }

}
