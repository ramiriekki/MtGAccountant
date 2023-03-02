import { ViewportScroller } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject, takeUntil } from 'rxjs';
import { Card } from '../models/Card';
import { ChildCards } from '../models/ChildCards';
import { CollectionCard } from '../models/CollectionCard';
import { Set } from '../models/set';
import { CardsService } from '../services/cards.service';
import { SetsService } from '../services/sets.service';
import { SortCardsService } from '../services/sort-cards.service';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.css']
})
export class SetComponent implements OnInit, OnDestroy {
  protected _unsubscribe$: Subject<void> = new Subject();

  cards: Card[] = []
  code: any = ""
  collection: CollectionCard[] = []
  sets: Set[] = []
  set!: Set
  collectedData!: any
  progressWidth: number = 0
  collected: number = 0
  childSets: Set[] = []
  childSetCards: ChildCards[] = []
  codes: string[] = []
  sortValue!: string
  wholeSetValue: number = 0;
  responsiveOptions: any[] = []
  topCards: Card[] = []

  constructor(
    private scroller: ViewportScroller,
    private setsService: SetsService,
    private router: Router,
    private cardsService: CardsService,
    private ngxService: NgxUiLoaderService,
    private cdr: ChangeDetectorRef,
    private SortCardsService: SortCardsService
  ) {
    this.responsiveOptions = [
      {
          breakpoint: '1260px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '900px',
          numVisible: 1,
          numScroll: 1
      }
  ];
    this.code = this.router.url.split('/').pop()
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.SortCardsService.onTypeChange$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((value) => {
        this.sortValue = value
        console.log(this.sortValue);

        if (this.sortValue == "nameAZ") {
          this.SortCardsService.sortByNameAZ(this.cards);
        } else if (this.sortValue == "nameZA"){
          this.SortCardsService.sortByNameZA(this.cards)
        } else if (this.sortValue == "collectorNumberAsc") {
          this.SortCardsService.sortByCollectorNumberAsc(this.cards)
        } else if (this.sortValue == "collectorNumberDec") {
          this.SortCardsService.sortByCollectorNumberDec(this.cards)
        } else if (this.sortValue == "rarityUp"){
          this.SortCardsService.sortByRarityAsc(this.cards)
        } else if (this.sortValue == "rarityDown") {
          this.SortCardsService.sortByRarityDec(this.cards)
        } else if (this.sortValue == "priceAsc") {
          this.SortCardsService.sortByPriceAsc(this.cards)
        } else if (this.sortValue == "priceDec") {
          this.SortCardsService.sortByPriceDec(this.cards)
        } else if (this.sortValue == "collected") {
          this.SortCardsService.sortByCollected(this.cards, this.collection)
        } else if (this.sortValue == "notCollected") {
          this.SortCardsService.sortByNotCollected(this.cards, this.collection)
        }
      })

    this.getChildSets(this.code)
    this.getSetValue(this.code)
    this.getCollection()
    this.getCards()
    this.getTopCards(this.code)
    this.getSetData(this.code)
    this.getCollectedCountFromSet(this.code)
    this.progressWidth = (this.collectedData.collected / this.collectedData.totalCount)*100
  }

  getCards(): void {
    this.ngxService.start()
    this.setsService.getSet(this.code).subscribe(cards => this.cards = cards)
    this.ngxService.stop()
  }

  getCollection(): void {
    this.cardsService.getCollection().subscribe(cards => this.collection = cards)
  }

  getSetData(code: string){
    this.setsService.getSetData(code).subscribe(set => this.set = set)
  }

  getSetValue(code: string) {
    this.setsService.getSetValue(code).subscribe(value => this.wholeSetValue = +value.toFixed(2))
  }

  getTopCards(code: string): void {
    this.setsService.getMostValuableCards(code).subscribe(cards => this.topCards = cards)
  }

  async getChildSets(code: string): Promise<void> {
    this.setsService.getChildSets(code).subscribe(sets => this.childSets = sets)
    this.setsService.getChildSets(code).subscribe(sets => sets.forEach(set => {
      this.codes.push(set.code)
      this.setsService.getSet(set.code).subscribe(cards => this.childSetCards.push(new ChildCards(set.code, cards)))
    }))
  }

  async getCollectedCountFromSet(code: string){
    this.cardsService.getCollectedCountFromSet(code).subscribe(collected => this.collectedData = collected)
    this.cardsService.getCollectedCountFromSet(code).subscribe(collected => this.collected = collected.collected)
    this.cardsService.getCollectedCountFromSet(code).subscribe(collected => this.progressWidth = (collected.collected / collected.totalCount)*100)
  }

  // Check if card is in collection. For styling the button
  isInCollection(id: string): boolean{
    let isCollected!: boolean

    for (const element of this.collection) {
      if(element.id == id){
        if(element.collected == true){
          isCollected = true
          break
        } else {
          isCollected = false
          break
        }
      }
    }

    return isCollected
  }

  addToCollection(id: string): void {
    // This is needed for updating the view
    for (const element of this.collection) {
      if(element.id == id){
        element.collected = true
      }
    }

    this.collected++
    this.progressWidth = (this.collected / this.set.card_count) * 100

    // update to db happens here
    this.cardsService.updateCollection([""], [id]);
    this.cdr.detectChanges()
  }

  removeFromCollection(id: string): void {
    // This is needed for updating the view
    for (const element of this.collection) {
      if(element.id == id){
        element.collected = false
      }
    }

    this.collected--
    this.progressWidth = (this.collected / this.set.card_count) * 100

    // update to db happens here
    this.cardsService.updateCollection([id], [""]);
  }

  moveToSubSet(code: string): void {
    this.scroller.scrollToAnchor(code);
  }

  addAllToCollection(): void {
    let ids: string[] = []

    this.cards.forEach(card => {
      ids.push(card.id)
    });

    for (const element of this.collection) {
      ids.forEach(id => {
        if(element.id == id){
          element.collected = true
        }
      });
    }

    this.progressWidth = 100

    // update to db happens here
    this.cardsService.updateCollection([""], ids);
    this.cdr.detectChanges()
  }

  removeAllFromCollection(): void {
    let ids: string[] = []

    this.cards.forEach(card => {
      ids.push(card.id)
    });

    for (const element of this.collection) {
      ids.forEach(id => {
        if(element.id == id){
          element.collected = false
        }
      });
    }

    this.progressWidth = 0

    // update to db happens here
    this.cardsService.updateCollection(ids, [""]);
    this.cdr.detectChanges()
  }
}
