import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerService } from '../server.service';
import { Card } from '../card';
import { Set } from '../set';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  cards: Card[] = []
  data: any[] = []
  isSet: boolean = false

  constructor(
    private route: ActivatedRoute,
    private serverService: ServerService
  ) { }

  ngOnInit(): void {
    if (this.route.routeConfig?.path == "cards"){
      this.isSet = false
    } else {
      this.isSet = true
    }
    this.getAllCards()
  }

  getAllCards(): void {
    console.log(this.route.routeConfig?.path)
    if (this.route.routeConfig?.path == "cards"){
      this.serverService.getAllCards().subscribe(cards => this.cards = cards)
    } else {
      const set = String(this.route.snapshot.paramMap.get('set'));
      this.serverService.getAllSetCards(set).subscribe(data => this.cards = data[0].cards)
    }
  }

  showFiller = false;

}
