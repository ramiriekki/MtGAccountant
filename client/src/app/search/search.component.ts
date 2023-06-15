import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
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
import { SearchService } from '../services/search.service';
import { SetsService } from '../services/sets.service';
import { SortCardsService } from '../services/sort-cards.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  protected _unsubscribe$: Subject<void> = new Subject();
  @ViewChild(MatTable, {static: false}) table!: MatTable<any>

  displayedColumns: string[] = ['name', 'set', 'set_code', 'set_type', 'collector_number', 'rarity', 'prices', 'owned'];
  displayedColumnsMobile: string[] = ['name', 'set_code', 'collector_number', 'owned'];
  parentForm!: FormGroup
  submitted: boolean = false;
  model = new Search();
  sets!: any[any]
  response: any
  cards: Card[] = []
  collection!: CollectionCard[];
  sortValue!: string
  isMobile: boolean = false

  rarities = ['common', 'uncommon',
            'rare', 'mythic'];

  constructor(
    private formBuilder: FormBuilder,
    private setService: SetsService,
    private searchService: SearchService,
    private cardsService: CardsService,
    private router: Router,
    private SortCardsService: SortCardsService
  ) { }

  ngOnInit(): void {
    this.submitted = false;

    // Parent group init
    this.parentForm = this.formBuilder.group({
      name: new FormControl(),
      rarities: new FormControl(),
      setTypes: new FormControl(),
      minPrice: new FormControl(),
      maxPrice: new FormControl(),
      sets: new FormControl(),
      owned: new FormControl()
    })
    this.getSetCodes()
    this.getCards()
    this.getCollection()

    this.SortCardsService.onTypeChange$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((value) => {
        this.sortValue = value
        if (this.sortValue == "nameAZ") {
          this.response = this.SortCardsService.sortByNameAZ(this.response);
        } else if (this.sortValue == "nameZA"){
          this.response = this.SortCardsService.sortByNameZA(this.response)
        } else if (this.sortValue == "collectorNumberAsc") {
          this.SortCardsService.sortByCollectorNumberAsc(this.response)
        } else if (this.sortValue == "collectorNumberDec") {
          this.SortCardsService.sortByCollectorNumberDec(this.response)
        } else if (this.sortValue == "rarityUp"){
          this.SortCardsService.sortByRarityAsc(this.response)
        } else if (this.sortValue == "rarityDown") {
          this.SortCardsService.sortByRarityDec(this.response)
        } else if (this.sortValue == "priceAsc") {
          this.SortCardsService.sortByPriceAsc(this.response)
        } else if (this.sortValue == "priceDec") {
          this.SortCardsService.sortByPriceDec(this.response)
        } else if (this.sortValue == "collected") {
          this.SortCardsService.sortByCollected(this.response, this.collection)
          console.log(this.response);

        } else if (this.sortValue == "notCollected") {
          this.SortCardsService.sortByNotCollected(this.response, this.collection)
          console.log(this.response);

        }

        this.table.renderRows() // update the table
      })
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.isMobile = window.innerWidth < 1100;
  }

  getSetCodes(): void {
    this.setService.getSetCodes().subscribe(codes => this.sets = codes)
  }

  getCards(): void {
    this.cardsService.getAllCards().subscribe(cards => this.cards = cards)
  }

  getCollection(): void {
    this.cardsService.getCollection().subscribe(collection => this.collection = collection)
  }

  onSubmit() {
    this.searchService.searchCards(this.parentForm.value).subscribe(response => this.response = response)
    this.searchService.searchCards(this.parentForm.value).subscribe(response => console.log(response))
    this.submitted = true;
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  goToCard(string: string): void {
    this.cards.forEach(card => {
      if (card.name === string) {
        this.router.navigate(['/dashboard/collection/', card.id])
      }
    });
  }

  isOwned(id: string): boolean {
    let isOwned: boolean = false

    this.collection.forEach(card => {
      if (card.name === id && card.collected === true) {
        isOwned = true
      } else if (card.name === id && card.collected === false) {
        isOwned = false
      }
    });

    return isOwned
  }

}
