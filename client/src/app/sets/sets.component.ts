import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SetsService } from '../services/sets.service';
import { Set } from '../set';


@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.css']
})
export class SetsComponent implements OnInit{
  sets: Set[] = []

  constructor(
    private router: Router,
    private setsService: SetsService
    ){
      localStorage.setItem("lastUrl",this.router.url);
  }

  ngOnInit(): void {
      // this.test = this.setsService.getSets()
      // console.log(this.test);
      this.getAllSets()
  }

  getAllSets(): void {
    this.setsService.getSets().subscribe(sets => this.sets = sets)
  }
}
