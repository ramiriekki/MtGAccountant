import {
    Component,
    HostListener,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject, takeUntil } from 'rxjs';
import { Card } from '../models/Card';
import { CollectionCard } from '../models/CollectionCard';
import { Search } from '../models/Search';
import { CardsService } from '../services/cards.service';
import { LoggerService } from '../services/logger.service';
import { SearchService } from '../services/search.service';
import { SetsService } from '../services/sets.service';
import { SortCardsService } from '../services/sort-cards.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
    protected unsubscribe$: Subject<void> = new Subject();
    @ViewChild(MatTable, { static: false }) table!: MatTable<any>;

    colors: any[] = [
        { short: 'W', name: 'White' },
        { short: 'B', name: 'Black' },
        { short: 'G', name: 'Green' },
        { short: 'R', name: 'Red' },
        { short: 'U', name: 'Blue' },
    ];

    parentForm!: FormGroup;
    submitted: boolean = false;
    model = new Search();
    sets!: any[any];
    response: any;
    cards: Card[] = [];
    collection!: CollectionCard[];
    sortValue!: string;
    isMobile: boolean = false;
    isLoading: boolean = true;

    rarities = ['common', 'uncommon', 'rare', 'mythic'];

    constructor(
        private formBuilder: FormBuilder,
        private setService: SetsService,
        private searchService: SearchService,
        private cardsService: CardsService,
        private router: Router,
        private SortCardsService: SortCardsService,
        private logger: LoggerService
    ) {}

    ngOnInit(): void {
        this.submitted = false;
        this.isLoading = true;

        // Parent group init
        this.parentForm = this.formBuilder.group({
            name: new FormControl(),
            rarities: new FormControl(),
            setTypes: new FormControl(),
            minPrice: new FormControl(),
            maxPrice: new FormControl(),
            sets: new FormControl(),
            colors: new FormControl(),
            owned: new FormControl(),
        });
        this.getSetCodes();
        this.getCards();
        this.getCollection();

        this.SortCardsService.onTypeChange$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((value) => {
                this.sortValue = value;
                if (this.sortValue == 'nameAZ') {
                    this.response = this.SortCardsService.sortByNameAZ(
                        this.response
                    );
                } else if (this.sortValue == 'nameZA') {
                    this.response = this.SortCardsService.sortByNameZA(
                        this.response
                    );
                } else if (this.sortValue == 'collectorNumberAsc') {
                    this.SortCardsService.sortByCollectorNumberAsc(
                        this.response
                    );
                } else if (this.sortValue == 'collectorNumberDec') {
                    this.SortCardsService.sortByCollectorNumberDec(
                        this.response
                    );
                } else if (this.sortValue == 'rarityUp') {
                    this.SortCardsService.sortByRarityAsc(this.response);
                } else if (this.sortValue == 'rarityDown') {
                    this.SortCardsService.sortByRarityDec(this.response);
                } else if (this.sortValue == 'priceAsc') {
                    this.SortCardsService.sortByPriceAsc(this.response);
                } else if (this.sortValue == 'priceDec') {
                    this.SortCardsService.sortByPriceDec(this.response);
                } else if (this.sortValue == 'collected') {
                    this.SortCardsService.sortByCollected(
                        this.response,
                        this.collection
                    );
                } else if (this.sortValue == 'notCollected') {
                    this.SortCardsService.sortByNotCollected(
                        this.response,
                        this.collection
                    );
                }

                this.table?.renderRows(); // update the table
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    @HostListener('window:resize', ['$event'])
    onWindowResize() {
        this.isMobile = window.innerWidth < 1100;
    }

    getSetCodes(): void {
        this.setService
            .getSetCodes()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((codes) => (this.sets = codes));
    }

    getCards(): void {
        this.cardsService
            .getAllCards()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((cards) => (this.cards = cards));
    }

    getCollection(): void {
        this.cardsService
            .getCollection()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((collection) => (this.collection = collection));
    }

    onSubmit() {
        this.searchService
            .searchCards(this.parentForm.value)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((response) => {
                this.response = response;
                this.isLoading = false;
            });
        this.searchService
            .searchCards(this.parentForm.value)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((response) => {} /*this.logger.debug(response)**/);
        this.submitted = true;
    }

    formatLabel(value: number) {
        if (value >= 1000) {
            return Math.round(value / 1000) + 'k';
        }

        return value;
    }

    goToCard(string: string): void {
        this.cards.forEach((card) => {
            if (card.name === string) {
                this.router.navigate(['/dashboard/collection/', card.id]);
            }
        });
    }

    isOwned(id: string): boolean {
        let isOwned: boolean = false;

        this.collection.forEach((card) => {
            if (card.name === id && card.collected === true) {
                isOwned = true;
            } else if (card.name === id && card.collected === false) {
                isOwned = false;
            }
        });

        return isOwned;
    }

    scrollToBottom(): void {
        window.scroll({
            top: document.body.scrollHeight,
            left: 0,
            behavior: 'smooth',
        });
    }
}
