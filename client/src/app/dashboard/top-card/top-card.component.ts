import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  collectionValue: number = 0;
  @Input()
  user: any;

  constructor(
    private router: Router,
    private ngxService: NgxUiLoaderService,
    private cardsService: CardsService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.getMostValuableCard()
    this.getCollectionValue()
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

  getCollectionValue(): void {
    this.cardsService.getCollectionValue().subscribe(value => this.collectionValue = +value.toFixed(2))
  }

  moveToTopCard(): void {
    this.router.navigate(['dashboard/collection)', this.mostValuableCard.id])
  }

}
