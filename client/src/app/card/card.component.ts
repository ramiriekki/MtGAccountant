import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Card } from '../models/Card';
import { CollectionCard } from '../models/CollectionCard';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  card!: Card
  image!: string
  flavor!: string
  oracle!: string
  power!: string
  toughness!: string
  collection!: CollectionCard[]

  constructor(
    private ngxService: NgxUiLoaderService,
    private route: ActivatedRoute,
    private cardsService: CardsService
    ) { }

    ngOnInit(): void {
      this.getCard()
      this.getCollection()
    }

    getCard(): void{
      this.ngxService.start()
      const id = String(this.route.snapshot.paramMap.get('id'))
      this.cardsService.getCard(id).subscribe(card => this.card = card)
      this.cardsService.getCard(id).subscribe(card => card.image_uris ? this.image = card.image_uris.border_crop : this.image = card.card_faces[0].image_uris.border_crop)
      this.cardsService.getCard(id).subscribe(card => card.flavor_text ? this.flavor = card.flavor_text : this.flavor = card.card_faces[0].flavor_text)
      this.cardsService.getCard(id).subscribe(card => card.oracle_text ? this.oracle = card.oracle_text : this.oracle = card.card_faces[0].oracle_text)
      this.cardsService.getCard(id).subscribe(card => card.power ? this.power = card.power : this.power = card.card_faces[0].power)
      this.cardsService.getCard(id).subscribe(card => card.toughness ? this.toughness = card.toughness : this.toughness = card.card_faces[0].toughness)
      this.ngxService.stop()
    }

    getCollection(): void {
      this.cardsService.getCollection().subscribe(collection => this.collection = collection)
    }

    goToLink(url: string){
      window.open(url, "_blank");
    }

    changeCardFace(faceImageUri: string) {
      this.card.card_faces.forEach(face => {
        if (faceImageUri != face.image_uris.border_crop) {
          this.image = face.image_uris.border_crop
          this.flavor = face.flavor_text
          this.oracle = face.oracle_text
          this.power = face.power
          this.toughness = face.toughness
        }
      });
    }

    isOwned(id: string): boolean {
      let isOwned: boolean = false

      this.collection.forEach(card => {
        if (card.id === id && card.collected === true) {
          isOwned = true
        } else if (card.id === id && card.collected === false) {
          isOwned = false
        }
      });

      return isOwned
    }

    addToCollection(id: string): void {
      // This is needed for updating the view
      for (const element of this.collection) {
        if(element.id == id){
          element.collected = true
        }
      }

      // update to db happens here
      this.cardsService.updateCollection([""], [id]);
    }

  removeFromCollection(id: string): void {
      // This is needed for updating the view
      for (const element of this.collection) {
        if(element.id == id){
          element.collected = false
        }
      }

      // update to db happens here
      this.cardsService.updateCollection([id], [""]);
    }

}
