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

  constructor(
    private setsService: SetsService,
    private router: Router,
    private cardsService: CardsService,
    private ngxService: NgxUiLoaderService,
    private cdr: ChangeDetectorRef,
    private SortCardsService: SortCardsService
  ) {
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
        console.log(this.sortValue)
        if (this.sortValue == "nameAZ") {
          this.SortCardsService.sortByNameAZ(this.cards);
        } else if (this.sortValue == "nameZA"){
          this.SortCardsService.sortByNameZA(this.cards)
        } else if (this.sortValue == "collectorNumberAsc") {
          console.log("asc")
          this.SortCardsService.sortByCollectorNumberAsc(this.cards)
        } else if (this.sortValue == "collectorNumberDec") {
          console.log("dec")
          this.SortCardsService.sortByCollectorNumberDec(this.cards)
        } else if (this.sortValue == "rarityUp"){
          this.SortCardsService.sortByRarityAsc(this.cards)
        } else if (this.sortValue == "rarityDown") {
          this.SortCardsService.sortByRarityDec(this.cards)
        }
      })

    this.getChildSets(this.code)
    this.getCollection()
    this.getCards()
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

  async getChildSets(code: string): Promise<void> {
    this.setsService.getChildSets(code).subscribe(sets => this.childSets = sets)
    this.setsService.getChildSets(code).subscribe(sets => sets.forEach(set => {
      this.codes.push(set.code)
      //console.log("code: " + set.code);
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
        //console.log(element.id, element.collected);

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
    console.log(id);

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
    console.log(id);

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

  log(): void {
    // console.log(this.codes)
    console.log(this.childSetCards)
    //this.setsService.getChildSets("bro").subscribe(sets => this.childSets = sets)
  }
}
