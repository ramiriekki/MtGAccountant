import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CollectionPercentages } from 'src/app/models/CollectionPercentages';
import { CardsService } from 'src/app/services/cards.service';
import { LoaderService } from 'src/app/services/loader.service';
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

  @Output()
  isProgLoading = new EventEmitter<boolean>();

  constructor(
    private setsService: SetsService,
    private cardsService: CardsService,
    private loaderService: LoaderService
    ) { }

  ngOnInit(): void {
    this.getAllSets()
    this.getCollectionPercentages()
  }

  ngAfterViewInit() {
      this.loaderService.progLoaded()
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
