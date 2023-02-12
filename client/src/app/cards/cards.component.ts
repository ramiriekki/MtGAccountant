import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Card } from '../models/Card';
import { CollectionCard } from '../models/CollectionCard';
import { CardsService } from '../services/cards.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  lowValue: number = 0;
  highValue: number = 20;

  cards: Card[] = []
  collection: CollectionCard[] = []

  currentPage: number = 0;

  constructor(
    private ngxService: NgxUiLoaderService,
    private router: Router,
    private cardsService: CardsService
  ) { }

  ngOnInit(): void {
    this.getCollection()
    this.getAllCards()
  }

  getAllCards(): void {
    this.ngxService.start()
    this.cardsService.getAllCards().subscribe(cards => this.cards = cards)
    this.ngxService.stop()
  }

  getCollection(): void {
    this.cardsService.getCollection().subscribe(cards => this.collection = cards)
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

  // used to build a slice of papers relevant at any given time
  public getPaginatorData(event: PageEvent): PageEvent {
    this.router.navigate([`dashboard/collection/page/${event.pageIndex}`])
    this.currentPage = event.pageIndex

    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }
}
