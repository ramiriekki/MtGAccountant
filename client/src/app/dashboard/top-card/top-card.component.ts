import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject, takeUntil } from 'rxjs';
import { Card } from 'src/app/models/Card';
import { CardsService } from 'src/app/services/cards.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
    selector: 'app-top-card',
    templateUrl: './top-card.component.html',
    styleUrls: ['./top-card.component.css'],
})
export class TopCardComponent implements OnInit, OnDestroy {
    protected _unsubscribe$: Subject<void> = new Subject();
    mostValuableCard!: Card | undefined;
    collectionValue: number = 0;
    totalCollectedAmount: number = 0;
    @Input()
    user: any;

    constructor(
        private router: Router,
        private ngxService: NgxUiLoaderService,
        private cardsService: CardsService,
        private loaderService: LoaderService
    ) {}

    ngOnInit(): void {
        this.getMostValuableCard();
        this.getCollectionValue();
        this.getCollectionCount();
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }

    ngAfterViewInit() {
        this.loaderService.topCardLoaded();
    }

    getMostValuableCard(): void {
        this.ngxService.start();
        this.cardsService
            .getMostValuableCard()
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe((card) => {
                this.mostValuableCard = card;
                this.ngxService.stop();
            })
            .add(() => {});
    }

    getCollectionValue(): void {
        this.cardsService
            .getCollectionValue()
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe((value) => (this.collectionValue = +value.toFixed(2)));
    }

    getCollectionCount(): void {
        this.cardsService
            .getCollectionCount()
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe((count) => (this.totalCollectedAmount = +count));
    }

    moveToTopCard(): void {
        this.router.navigate([
            'dashboard/collection)',
            this.mostValuableCard?.id,
        ]);
    }
}
