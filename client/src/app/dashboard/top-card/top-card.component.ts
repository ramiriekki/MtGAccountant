import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Card } from 'src/app/models/Card';
import { CardsService } from 'src/app/services/cards.service';

@Component({
  selector: 'app-top-card',
  templateUrl: './top-card.component.html',
  styleUrls: ['./top-card.component.css']
})
export class TopCardComponent implements OnInit {
  mostValuableCard!: Card;

  constructor(
    private ngxService: NgxUiLoaderService,
    private cardsService: CardsService
  ) { }

  ngOnInit(): void {
    this.getMostValuableCard()
  }

  getMostValuableCard(): void {
    this.ngxService.start()
    this.cardsService.getMostValuableCard().subscribe(card => this.mostValuableCard = card).add(() => {
    });
    this.ngxService.stop()
  }

}
