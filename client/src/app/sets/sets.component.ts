import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject, Subscription, takeUntil } from 'rxjs';
import { SetsService } from '../services/sets.service';
import { Set } from '../models/set';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CardsService } from '../services/cards.service';
import { CollectionPercentages } from '../models/CollectionPercentages';

@Component({
    selector: 'app-sets',
    templateUrl: './sets.component.html',
    styleUrls: ['./sets.component.css'],
})
export class SetsComponent implements OnInit, OnDestroy {
    protected unsubscribe$: Subject<void> = new Subject();
    parentForm!: FormGroup;
    sets: Set[] = [];
    submittedValue: string = '';
    collectionPercentages: CollectionPercentages[] = [];

    constructor(
        private cardsService: CardsService,
        private ngxService: NgxUiLoaderService,
        private formBuilder: FormBuilder,
        private router: Router,
        private setsService: SetsService
    ) {
        localStorage.setItem('lastUrl', this.router.url);
    }

    ngOnInit(): void {
        // Parent group init
        this.parentForm = this.formBuilder.group({
            type: new FormControl(),
        });
        this.getAllSets();
        this.getCollectionPercentages();
        this.onSubmit('expansion');
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    getAllSets(): void {
        this.setsService
            .getSets()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((sets) => (this.sets = sets));
    }

    getCollectionPercentages(): void {
        this.cardsService
            .getCollectionPercentages()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                (percentages) => (this.collectionPercentages = percentages)
            );
    }

    onSubmit(value: string) {
        this.submittedValue = value;
    }

    getProgressValue(code: string): any {
        let progressWidth: any;

        this.collectionPercentages.forEach((set) => {
            if (set.code === code) {
                progressWidth = set.progress;
            }
        });

        return progressWidth;
    }

    isNew(set: any): boolean {
        let date = new Date(
            set.released_at.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')
        );
        let dateNow = new Date();

        if (dateNow.getTime() - date.getTime() > 1000 * 60 * 60 * 24 * 30) {
            return false;
        }
        return true;
    }
}
