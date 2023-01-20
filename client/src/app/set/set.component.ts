import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private setsService: SetsService,
    private router: Router,
    private cardsService: CardsService
  ) { 
    this.code = this.router.url.split('/').pop()
  }

  ngOnInit(): void {
    this.getCollection()
    this.getCards() 
    this.getSetData(this.code)
  }

  getCards(): void {
    this.setsService.getSet(this.code).subscribe(cards => this.cards = cards)
  }

  getCollection(): void {
    this.cardsService.getCollection().subscribe(cards => this.collection = cards)
  }

  getSetData(code: string){
    console.log("Get set data");
    console.log(code);
    
    for (const set of this.sets){
      if (set.code == code){
        this.set = set
        console.log(this.set);
        console.log("found");
        
        break
      }
    }
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

    // update to db happens here
    this.cardsService.updateCollection([""], [id]);
  }

  removeFromCollection(id: string): void {
    console.log(id);

    // This is needed for updating the view
    for (const element of this.collection) {
      if(element.id == id){
        element.collected = false
      }
    }

    // update to db happens here
    this.cardsService.updateCollection([id], [""]);
  }

}
