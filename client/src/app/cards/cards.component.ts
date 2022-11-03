import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerService } from '../server.service';
import { Card } from '../card';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  cards: Card[] = []

  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
    this.getAllCards()
  }

  getAllCards(): void {
    this.serverService.getAllCards().subscribe(cards => this.cards = cards)
  }

  showFiller = false;

}
