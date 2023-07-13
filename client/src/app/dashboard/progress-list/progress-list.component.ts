import {
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CollectionPercentages } from 'src/app/models/CollectionPercentages';
import { CardsService } from 'src/app/services/cards.service';
import { LoaderService } from 'src/app/services/loader.service';
import { SetsService } from 'src/app/services/sets.service';
import { Set } from '../../models/set';

@Component({
    selector: 'app-progress-list',
    templateUrl: './progress-list.component.html',
    styleUrls: ['./progress-list.component.css'],
})
export class ProgressListComponent implements OnInit, OnDestroy {
    protected _unsubscribe$: Subject<void> = new Subject();
    sets: Set[] = [];
    collectionPercentages: CollectionPercentages[] = [];

    @Output()
    isProgLoading = new EventEmitter<boolean>();

    constructor(
        private setsService: SetsService,
        private cardsService: CardsService,
        private loaderService: LoaderService
    ) {}

    ngOnInit(): void {
        this.getAllSets();
        this.getCollectionPercentages();
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }

    ngAfterViewInit() {
        this.loaderService.progLoaded();
    }

    getAllSets(): void {
        this.setsService
            .getSets()
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe((sets) => (this.sets = sets));
    }

    getCollectionPercentages(): void {
        this.cardsService
            .getCollectionPercentages()
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe(
                (percentages) => (this.collectionPercentages = percentages)
            );
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
}
