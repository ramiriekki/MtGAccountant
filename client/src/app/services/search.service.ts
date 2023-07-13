import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    url = environment.apiUrl;

    constructor(private httpClient: HttpClient) {}

    searchCards(searchData: any): Observable<any> {
        if (searchData.minPrice == null) {
            searchData.minPrice = 0;
        }

        if (searchData.maxPrice == null) {
            searchData.maxPrice = 0;
        }

        return this.httpClient.get(
            this.url +
                `/api/search/cards?name=${searchData.name}&rarities=${searchData.rarities}&setTypes=${searchData.setTypes}&minPrice=${searchData.minPrice}&maxPrice=${searchData.maxPrice}&sets=${searchData.sets}&colors=${searchData.colors}&owned=${searchData.owned}`,
            {
                headers: new HttpHeaders().set(
                    'Content-Type',
                    'application/json'
                ),
            }
        );
    }
}
