import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SetsService } from '../services/sets.service';
import { Set } from '../models/set';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';


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

}
