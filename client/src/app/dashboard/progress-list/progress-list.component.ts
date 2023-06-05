import { Component, OnInit } from '@angular/core';
import { CollectionPercentages } from 'src/app/models/CollectionPercentages';
import { CardsService } from 'src/app/services/cards.service';
import { SetsService } from 'src/app/services/sets.service';
import { Set } from '../../models/set';

@Component({
  selector: 'app-progress-list',
  templateUrl: './progress-list.component.html',
  styleUrls: ['./progress-list.component.css']
})
export class ProgressListComponent implements OnInit {
  sets: Set[] = []
  collectionPercentages: CollectionPercentages[] = []

  constructor(
    private setsService: SetsService,
    private cardsService: CardsService
    ) { }

  ngOnInit(): void {
      this.getAllSets()
      this.getCollectionPercentages()
  }

  getAllSets(): void {
    this.setsService.getSets().subscribe(sets => this.sets = sets)
  }

  getCollectionPercentages(): void {
    this.cardsService.getCollectionPercentages().subscribe(percentages => this.collectionPercentages = percentages)
  }

  getProgressValue(code: string): any {
    let progressWidth: any

    this.collectionPercentages.forEach(set => {
      if (set.code === code) {
        progressWidth = set.progress
      }
    });

    return progressWidth
  }

}
