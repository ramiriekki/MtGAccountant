import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from '../models/Card';
import { Collection } from '../models/Collection';
import { CollectionCard } from '../models/CollectionCard';
import { CollectionPercentages } from '../models/CollectionPercentages';
import { UpdateData } from '../models/UpdateData';
import { LoggerService } from './logger.service';

@Injectable({
    providedIn: 'root',
})
export class CardsService {
    url = environment.apiUrl;

    constructor(
        private httpClient: HttpClient,
        private logger: LoggerService
    ) {}

    getAllCards(): Observable<Card[]> {
        // TODO get collection instead of all cards
        return this.httpClient.get<Card[]>(this.url + '/api/cards/all-cards');
    }

    getCollection(): Observable<CollectionCard[]> {
        return this.httpClient
            .get<Collection>(
                this.url +
                    `/api/collections/collection?email=${localStorage.getItem(
                        'user'
                    )}`
            )
            .pipe(map((c) => c.cards));
    }

    getCard(id: string): Observable<Card> {
        return this.httpClient.get<Card>(
            this.url + `/api/cards/card?cardId=${id}`
        );
    }

    getCollectionPercentages(): Observable<CollectionPercentages[]> {
        return this.httpClient.get<CollectionPercentages[]>(
            this.url +
                `/api/collections/collection/sets-progress?email=${localStorage.getItem(
                    'user'
                )}`
        );
    }

    getCollectionValue(): Observable<number> {
        return this.httpClient.get<number>(
            this.url +
                `/api/collections/collection/value?email=${localStorage.getItem(
                    'user'
                )}`
        );
    }

    updateCollection(removeArr: string[], addArr: any[]) {
        const data = { id_list: addArr, remove_list: removeArr };

        try {
            return this.httpClient
                .post(
                    this.url +
                        `/api/collections/collection?email=${localStorage.getItem(
                            'user'
                        )}`,
                    data,
                    {
                        headers: new HttpHeaders().set(
                            'Content-Type',
                            'application/json'
                        ),
                    }
                )
                .subscribe();
        } catch (error: any) {
            this.logger.error(error);
            return null;
        }
    }

    getCollectedCountFromSet(code: string): Observable<any> {
        return this.httpClient.get<any>(
            this.url +
                `/api/collections/collection/set?email=${localStorage.getItem(
                    'user'
                )}&code=${code}`
        );
    }

    getMostValuableCard(): Observable<Card> {
        return this.httpClient.get<any>(
            this.url +
                `/api/collections/collection/most-valuable?email=${localStorage.getItem(
                    'user'
                )}`
        );
    }

    getCollectionCount(): Observable<number> {
        return this.httpClient.get<number>(
            this.url +
                `/api/collections/collection/count?email=${localStorage.getItem(
                    'user'
                )}`
        );
    }
}
