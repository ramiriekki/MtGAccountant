import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  url = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  searchCards(searchData: any): Observable<any>{
    const data = { name: searchData.name, rarities: searchData.rarities, setTypes: searchData.setTypes, minPrice: searchData.minPrice, maxPrice: searchData.maxPrice, sets: searchData.sets, owned: searchData.owned}

    return this.httpClient.post(this.url + `/api/search/cards`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }
}
