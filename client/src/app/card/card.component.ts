import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Card } from '../models/Card';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  card!: Card
  image!: string
  constructor(
    private ngxService: NgxUiLoaderService,
    private route: ActivatedRoute,
    private cardsService: CardsService
    ) { }

    ngOnInit(): void {
      this.getCard()
      console.log(this.getCard());
    }

    getCard(): void{
      this.ngxService.start()
      const id = String(this.route.snapshot.paramMap.get('id'))
      this.cardsService.getCard(id).subscribe(card => this.card = card)
      this.cardsService.getCard(id).subscribe(card => card.image_uris ? this.image = card.image_uris.border_crop : this.image = card.card_faces[0].image_uris.border_crop)
      this.ngxService.stop()
    }

  debug(): void {
    console.log(this.card);

  }

  goToLink(url: string){
    console.log(url);

    window.open(url, "_blank");
  }

  changeCardFace(faceImageUri: string) {
    this.card.card_faces.forEach(face => {
      if (faceImageUri != face.image_uris.border_crop) {
        this.image = face.image_uris.border_crop
      }
    });
  }

}
