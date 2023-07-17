import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';

@Component({
    selector: 'app-search-form',
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit, OnDestroy {
    protected unsubscribe$: Subject<void> = new Subject();
    colors: any[] = [
        { short: 'W', name: 'White' },
        { short: 'B', name: 'Black' },
        { short: 'G', name: 'Green' },
        { short: 'R', name: 'Red' },
        { short: 'U', name: 'Blue' },
    ];
    @Input() sets: any[any];
    parentForm!: FormGroup;
    @Output() submitted = new EventEmitter<boolean>();
    @Output() response = new EventEmitter<any>();
    @Output() isLoading = new EventEmitter<boolean>();

    constructor(
        private formBuilder: FormBuilder,
        private searchService: SearchService
    ) {}

    ngOnInit(): void {
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
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    onSubmit() {
        this.searchService
            .searchCards(this.parentForm.value)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((response) => {
                this.addResponse(response);
                this.isLoading.emit(false);
            });
        this.submitted.emit(true);
    }

    addResponse(value: any) {
        this.response.emit(value);
    }
}
