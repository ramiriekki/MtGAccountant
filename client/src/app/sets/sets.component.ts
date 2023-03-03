import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { SetsService } from '../services/sets.service';
import { Set } from '../models/set';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CardsService } from '../services/cards.service';
import { CollectionPercentages } from '../models/CollectionPercentages';


@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.css'],
})
export class SetsComponent implements OnInit{
  parentForm!: FormGroup
  sets: Set[] = []
  submittedValue: string = "";
  collectionPercentages: CollectionPercentages[] = []


  constructor(
    private cardsService: CardsService,
    private ngxService: NgxUiLoaderService,
    private formBuilder: FormBuilder,
    private router: Router,
    private setsService: SetsService
    ){
      localStorage.setItem("lastUrl",this.router.url);
  }

  ngOnInit(): void {

    // Parent group init
    this.parentForm = this.formBuilder.group({
      type: new FormControl()
    })
      this.getAllSets()
      this.getCollectionPercentages()
      this.onSubmit("expansion")
  }

  getAllSets(): void {
    this.setsService.getSets().subscribe(sets => this.sets = sets)
  }

  getCollectionPercentages(): void {
    this.cardsService.getCollectionPercentages().subscribe(percentages => this.collectionPercentages = percentages)
  }

  onSubmit(value: string) {
    this.submittedValue = value
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
