import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../models/Card';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  card!: Card
  
  constructor(
    private route: ActivatedRoute,
    private cardsService: CardsService
    ) { }
    
    ngOnInit(): void {
      this.getCard()
      console.log(this.getCard());
    }
    
    getCard(): void{
      const id = String(this.route.snapshot.paramMap.get('id'))
      this.cardsService.getCard(id).subscribe(card => this.card = card)
    }

}
