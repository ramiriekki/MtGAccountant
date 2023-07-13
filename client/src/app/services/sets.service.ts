import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from '../models/Card';
import { Set } from '../models/set';

@Injectable({
    providedIn: 'root',
})
export class SetsService {
    url = environment.apiUrl;

    constructor(private httpClient: HttpClient) {}

    getSets(): Observable<Set[]> {
        return this.httpClient.get<Set[]>(this.url + '/api/sets/all');
    }

    getSet(code: string): Observable<Card[]> {
        return this.httpClient.get<Card[]>(
            this.url + `/api/cards/set?code=${code}`
        );
    }

    getSetData(code: string): Observable<Set> {
        return this.httpClient.get<Set>(
            this.url + `/api/sets/set?code=${code}`
        );
    }

    getSetCodes(): Observable<string[]> {
        return this.httpClient.get<any[any]>(this.url + `/api/sets/codes`);
    }

    getChildSets(code: string): Observable<Set[]> {
        return this.httpClient.get<Set[]>(
            this.url + `/api/sets/child-sets?code=${code}`
        );
    }

    getSetValue(code: string): Observable<number> {
        return this.httpClient.get<number>(
            this.url +
                `/api/sets/set/value?code=${code}&email=${localStorage.getItem(
                    'user'
                )}`
        );
    }

    getMostValuableCards(code: string): Observable<Card[]> {
        return this.httpClient.get<Card[]>(
            this.url +
                `/api/sets/set/top-cards?code=${code}&email=${localStorage.getItem(
                    'user'
                )}`
        );
    }
}
