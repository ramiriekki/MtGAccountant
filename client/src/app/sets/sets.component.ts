import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { SetsService } from '../services/sets.service';
import { Set } from '../models/set';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CardsService } from '../services/cards.service';


@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.css']
})
export class SetsComponent implements OnInit{
  parentForm!: FormGroup
  sets: Set[] = []
  submittedValue: string = "";


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
      // this.test = this.setsService.getSets()
      // console.log(this.test);
      this.getAllSets()
  }

  getAllSets(): void {
    this.ngxService.start()
    this.setsService.getSets().subscribe(sets => this.sets = sets)
    this.ngxService.stop()
  }

  onSubmit(value: string) {
    console.log(value);
    this.submittedValue = value
  }

  getProgressValue(code: string): any {
    let progressWidth: any
    console.log("here");

    //return this.cardsService.getCollectedCountFromSet(code).subscribe(collected => (collected.collected / collected.totalCount)*100)
    //return progressWidth
  }

}
