import { Component, OnInit } from '@angular/core';
import { SortCardsService } from 'src/app/services/sort-cards.service';

@Component({
  selector: 'app-sort-tabs',
  templateUrl: './sort-tabs.component.html',
  styleUrls: ['./sort-tabs.component.css']
})

export class SortTabsComponent implements OnInit {
  values: string[] = [
    "nameAZ",
    "nameZA",
    "collectorNumberAsc",
    "collectorNumberDec",
    "rarityUp",
    "rarityDown"
  ]

  constructor(private sortCardsService: SortCardsService) { }

  ngOnInit(): void {
  }

  setSortValue(value: string): void {
    this.sortCardsService.setSortValue(value);
  }

}
