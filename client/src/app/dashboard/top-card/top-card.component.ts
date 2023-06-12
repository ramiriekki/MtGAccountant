import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Card } from 'src/app/models/Card';
import { CardsService } from 'src/app/services/cards.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-top-card',
  templateUrl: './top-card.component.html',
  styleUrls: ['./top-card.component.css']
})
export class TopCardComponent implements OnInit {
  mostValuableCard!: Card;

  constructor(
    private ngxService: NgxUiLoaderService,
    private cardsService: CardsService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.getMostValuableCard()
  }

  ngAfterViewInit() {
    this.loaderService.topCardLoaded()
 }

  getMostValuableCard(): void {
    this.ngxService.start()
    this.cardsService.getMostValuableCard().subscribe(card => this.mostValuableCard = card).add(() => {
    });
    this.ngxService.stop()
  }

}
