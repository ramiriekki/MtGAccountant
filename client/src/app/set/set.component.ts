import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Card } from '../models/Card';
import { CollectionCard } from '../models/CollectionCard';
import { Set } from '../models/set';
import { CardsService } from '../services/cards.service';
import { SetsService } from '../services/sets.service';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.css']
})
export class SetComponent implements OnInit {
  cards: Card[] = []
  code: any = ""
  collection: CollectionCard[] = []
  sets: Set[] = []
  set!: Set
  collectedData!: any
  progressWidth: number = 0
  collected: number = 0

  constructor(
    private setsService: SetsService,
    private router: Router,
    private cardsService: CardsService,
    private ngxService: NgxUiLoaderService,
    private cdr: ChangeDetectorRef
  ) {
    this.code = this.router.url.split('/').pop()
  }

  ngOnInit(): void {
    this.getCollection()
    this.getCards()
    this.getSetData(this.code)
    this.getCollectedCountFromSet(this.code)
    this.progressWidth = (this.collectedData.collected / this.collectedData.totalCount)*100
  }

  getCards(): void {
    this.setsService.getSet(this.code).subscribe(cards => this.cards = cards)
  }

  getCollection(): void {
    this.cardsService.getCollection().subscribe(cards => this.collection = cards)
  }

  getSetData(code: string){
    this.setsService.getSetData(code).subscribe(set => this.set = set)
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
    console.log(this.collected)
  }
}
