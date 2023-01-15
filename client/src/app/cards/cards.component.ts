import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Card } from '../models/Card';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  lowValue: number = 0;
  highValue: number = 20;

  cards: Card[] = []

  constructor(
    private cardsService: CardsService
  ) { }

  ngOnInit(): void {
    this.getAllCards()
  }

  getAllCards(): void {
    this.cardsService.getAllCards().subscribe(cards => this.cards = cards)
  }

    // used to build a slice of papers relevant at any given time
    public getPaginatorData(event: PageEvent): PageEvent {
      this.lowValue = event.pageIndex * event.pageSize;
      this.highValue = this.lowValue + event.pageSize;
      return event;
    }

}
