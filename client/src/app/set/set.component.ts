import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from '../models/Card';
import { SetsService } from '../services/sets.service';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.css']
})
export class SetComponent implements OnInit {
  cards: Card[] = []
  code: any = ""

  constructor(private setsService: SetsService,
    private router: Router) { 
      this.code = this.router.url.split('/').pop()
    }

  ngOnInit(): void {
    this.getCards()
  }

  getCards(): void {
    this.setsService.getSet(this.code).subscribe(cards => this.cards = cards)
  }

}
