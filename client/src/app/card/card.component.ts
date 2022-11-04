import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../card';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  card: Card | undefined = undefined

  constructor(
    private route: ActivatedRoute,
    private serverService: ServerService) { }

  ngOnInit(): void {
    this.getSingleCard()
  }

  getSingleCard(): void {
    const id = String(this.route.snapshot.paramMap.get('card'));  // Get ID param from route
    console.log(`ID is ${id}`)
    this.serverService.getSingleCard(id).subscribe(card => this.card = card)
  }
}
