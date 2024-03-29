import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { Card } from '../models/Card';
import { CollectionCard } from '../models/CollectionCard';
import { CardsService } from '../services/cards.service';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit, OnDestroy {
    card!: Card | undefined;
    image!: string | undefined;
    flavor!: string | undefined;
    oracle!: string | undefined;
    power!: string | undefined;
    toughness!: string | undefined;
    collection!: CollectionCard[];
    private unsubscribe$ = new Subject<void>();

    constructor(
        private ngxService: NgxUiLoaderService,
        private route: ActivatedRoute,
        private cardsService: CardsService
    ) {}

    ngOnInit(): void {
        this.getCard();
        this.getCollection();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    getCard(): void {
        this.ngxService.start();
        const id = String(this.route.snapshot.paramMap.get('id'));

        forkJoin([
            this.cardsService.getCard(id),
            this.cardsService.getCard(id),
            this.cardsService.getCard(id),
            this.cardsService.getCard(id),
            this.cardsService.getCard(id),
            this.cardsService.getCard(id),
        ])
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                ([
                    card,
                    imageCard,
                    flavorCard,
                    oracleCard,
                    powerCard,
                    toughnessCard,
                ]) => {
                    this.card = card;
                    this.image = card.image_uris.border_crop;
                    this.flavor = card.flavor_text;
                    this.oracle = card.oracle_text;
                    this.power = card.power;
                    this.toughness = card.toughness;
                    this.ngxService.stop();
                }
            );
    }

    getCollection(): void {
        this.cardsService
            .getCollection()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((collection) => (this.collection = collection));
    }

    goToLink(url: string | undefined) {
        window.open(url, '_blank');
    }

    changeCardFace(faceImageUri: string | undefined) {
        const face = this.card?.card_faces[0];
        if (faceImageUri !== face?.image_uris.border_crop) {
            this.image = face?.image_uris.border_crop;
            this.flavor = face?.flavor_text;
            this.oracle = face?.oracle_text;
            this.power = face?.power;
            this.toughness = face?.toughness;
        }
    }

    isOwned(id: string | undefined): boolean {
        if (id != undefined) {
            return this.collection?.some(
                (card) => card.id === id && card.collected
            );
        } else {
            return false;
        }
    }

    addToCollection(id: string | undefined): void {
        const card = this.collection.find((element) => element.id === id);
        if (card) {
            card.collected = true;
        }

        if (id !== undefined) {
            this.cardsService.updateCollection([''], [id]);
        }
    }

    removeFromCollection(id: string | undefined): void {
        const card = this.collection.find((element) => element.id === id);
        if (card) {
            card.collected = false;
        }
        if (id !== undefined) {
            this.cardsService.updateCollection([id], ['']);
        }
    }
}
