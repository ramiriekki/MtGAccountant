import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerService } from '../server.service';
import { Card } from '../card';
import { Set } from '../set';
import { ActivatedRoute } from '@angular/router';
import { Collected_Data } from '../models/collected_data.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  cards: Card[] = []
  data: any[] = []
  isSet: boolean = false
  user: String | null = localStorage.getItem('token');
  collectedAmount?: number
  collected_data!: Collected_Data


  constructor(
    private route: ActivatedRoute,
    private serverService: ServerService
  ) { }

  ngOnInit(): void {
    if (this.route.routeConfig?.path == "cards"){
      this.isSet = false
    } else {
      this.isSet = true
    }
    this.getAllCards()
    this.getCollectedData()
  }

  getAllCards(): void {
    console.log(this.route.routeConfig?.path)
    if (this.route.routeConfig?.path == "cards"){
      this.serverService.getAllCards().subscribe(cards => this.cards = cards)
    } else {
      const set = String(this.route.snapshot.paramMap.get('set'));
      this.serverService.getAllSetCards(set).subscribe(data => this.cards = data[0].cards)
    }
  }

  postCards(): void{
    const data = [
      {value: this.cards.filter(c=>c.isChecked)} // Get only cards that are checked
    ];

    console.log(data)

    this.serverService.postCards(data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.error(e)
    });
  }

  getCollectedData(){
    this.serverService.getCollectedData().subscribe(collected_data => this.collected_data = collected_data)
  }

  showFiller = false;

}
