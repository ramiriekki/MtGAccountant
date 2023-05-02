import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card } from 'src/app/models/Card';
import { CollectionCard } from 'src/app/models/CollectionCard';
import { CardsService } from 'src/app/services/cards.service';

@Component({
  selector: 'app-binder-modify',
  templateUrl: './binder-modify.component.html',
  styleUrls: ['./binder-modify.component.css']
})
export class BinderModifyComponent implements OnInit {
  leftCards: Card[] = []
  rightCards: Card[] = []
  leftIndexes: {start: number, end: number} = {start: 0, end: 9}
  rightIndexes: {start: number, end: number} = {start: 9, end: 18}
  showCards: boolean = true

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {cards: Card[], collection: CollectionCard[]},
    private cardsService: CardsService
    ) { }

  ngOnInit(): void {


  }

  ngAfterViewInit(): void {
    this.leftCards = this.data.cards.slice(this.leftIndexes.start, this.leftIndexes.end);
    this.rightCards = this.data.cards.slice(this.rightIndexes.start, this.rightIndexes.end);
    console.log(this.leftCards);

  }

  handleNextOpening(): void {
    if (this.rightCards[this.rightCards.length - 1].id !== this.data.cards[this.data.cards.length - 1].id) {
      this.leftIndexes.start = this.leftIndexes.start + 18
      this.leftIndexes.end = this.leftIndexes.end + 18

      this.rightIndexes.start = this.rightIndexes.start + 18
      this.rightIndexes.end = this.rightIndexes.end + 18

      this.leftCards = this.data.cards.slice(this.leftIndexes.start, this.leftIndexes.end);
      this.rightCards = this.data.cards.slice(this.rightIndexes.start, this.rightIndexes.end);
    }

  }

  handlePreviousOpening(): void {
    if (this.leftIndexes.start != 0) {
      this.leftIndexes.start = this.leftIndexes.start - 18
      this.leftIndexes.end = this.leftIndexes.end - 18

      this.rightIndexes.start = this.rightIndexes.start - 18
      this.rightIndexes.end = this.rightIndexes.end - 18

      this.leftCards = this.data.cards.slice(this.leftIndexes.start, this.leftIndexes.end);
      this.rightCards = this.data.cards.slice(this.rightIndexes.start, this.rightIndexes.end);
    }
  }

  // Check if card is in collection. For styling the button
  isInCollection(id: string): boolean{
    let isCollected!: boolean

    for (const element of this.data.collection) {
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
    for (const element of this.data.collection) {
      if(element.id == id){
        element.collected = true
      }
    }

    // update to db happens here
    this.cardsService.updateCollection([""], [id]);
  }

  removeFromCollection(id: string): void {
    // This is needed for updating the view
    for (const element of this.data.collection) {
      if(element.id == id){
        element.collected = false
      }
    }

    // update to db happens here
    this.cardsService.updateCollection([id], [""]);
  }

  handlePocketClick(id: string): void {
    let isPocketCollected
    isPocketCollected = this.isInCollection(id);

    if (!isPocketCollected) {
      this.addToCollection(id)
    } else {
      this.removeFromCollection(id)
    }
  }

  changeDisplay(): void {
    this.showCards = !this.showCards;
  }

  addWholeOpening(): void {
    let ids: string[] = []

    this.leftCards.forEach((card) => {
      ids.push(card.id)
    })

    this.rightCards.forEach((card) => {
      ids.push(card.id)
    })

    for (const element of this.data.collection) {
      ids.forEach(id => {
        if(element.id == id){
          element.collected = true
        }
      });
    }

    this.cardsService.updateCollection([""], ids);
  }

}
