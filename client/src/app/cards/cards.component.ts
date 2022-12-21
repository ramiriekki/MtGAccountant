import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
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
  topCards: Card[] = []
  cards: Card[] = []
  data: any[] = []
  isSet: boolean = false
  user: String | null = localStorage.getItem('token');
  collectedAmount?: number
  collected_data!: Collected_Data
  progress!: number
  filterArray?: []

  constructor(
    private route: ActivatedRoute,
    private serverService: ServerService,
    private renderer: Renderer2,
    private elRef: ElementRef
  ) { }

  ngOnInit(): void {
    // Check if user is on the cards or sets path
    if (this.route.routeConfig?.path == "cards"){
      this.isSet = false
    } else {
      this.isSet = true
    }

    this.getAllCards()
    this.getCollectedData()
  }

  ngAfterViewInit() {
    this.progress = (this.collected_data.collected! / this.collected_data.total!)*100
    this.renderer.setStyle(this.elRef.nativeElement.querySelector('.progress'), 'width', this.progress + "%");
    //this.renderer.setStyle(this.elRef.nativeElement.querySelector('.progress'), 'width', 50 + "%");
    this.getTopCards()
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

  // Progress bar data
  getCollectedData(){
    this.serverService.getCollectedData().subscribe(collected_data => this.collected_data = collected_data)
  }

  // TODO get 3 most expensive cards currently owned
  getTopCards(){
    let temp = [...this.cards]
    temp = temp.sort(function (a:Card, b:Card) {  return a.price - b.price; })
    temp = temp.slice(Math.max(temp.length - 3, 0)) // Get 3 most expensive cards
    this.topCards = temp
    console.log(this.topCards)
  }

  // For the sort buttons
  // TODO local cards array and filtered array
  sortCards(number: number){

    switch (number) {
      case 0:   // Price ascending
          //this.getAllCards()
          this.cards.sort(function (a:Card, b:Card) {  return a.price - b.price; })
          break;
      case 1:   // Price decending
          ////this.getAllCards()
          this.cards.sort(function (a:Card, b:Card) {  return b.price - a.price; })
          break;
      case 2:   // Name A-Z
          //this.getAllCards()
          this.cards.sort(function (a:Card, b:Card) {return a.name.localeCompare(b.name)})
          break
      case 3:   // Name Z-A
          //this.getAllCards()
          this.cards.sort(function (a:Card, b:Card) {return a.name.localeCompare(b.name)})
          this.cards.reverse()
          break
      case 4:
         // this.getAllCards()
          this.groupBy("common")
          console.log(this.cards)
          break
      case 5:
          //this.getAllCards()
          this.groupBy("uncommon")
          console.log(this.cards)
          break
      case 6:
          //this.getAllCards()
          this.groupBy("rare")
          console.log(this.cards)
          break
      case 7:
          //this.getAllCards()
          this.groupBy("mythic")
          console.log(this.cards)
          break
      default:
          console.log("error");
          break;
    }
  }

  groupBy(rarity: string) {
    this.cards = this.cards.filter((c: { rarity: string; }) => c.rarity === rarity)
  }

  showFiller = false;

}
