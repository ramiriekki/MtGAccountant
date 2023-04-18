import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card } from 'src/app/models/Card';

@Component({
  selector: 'app-binder-modify',
  templateUrl: './binder-modify.component.html',
  styleUrls: ['./binder-modify.component.css']
})
export class BinderModifyComponent implements OnInit {
  leftCards: Card[] = []
  rightCards: Card[] = []
  leftIndexes: {start: number, end: number} = {start: 0, end: 9}
  rightIndexes: {start: number, end: number} = {start: 9, end: 18}

  constructor(@Inject(MAT_DIALOG_DATA) public data: Card[]) { }

  ngOnInit(): void {


  }

  ngAfterViewInit(): void {
    this.leftCards = this.data.slice(this.leftIndexes.start, this.leftIndexes.end);
    this.rightCards = this.data.slice(this.rightIndexes.start, this.rightIndexes.end);
  }

  handleNextOpening(): void {
    if (this.rightCards[this.rightCards.length - 1].id !== this.data[this.data.length - 1].id) {
      this.leftIndexes.start = this.leftIndexes.start + 18
      this.leftIndexes.end = this.leftIndexes.end + 18

      this.rightIndexes.start = this.rightIndexes.start + 18
      this.rightIndexes.end = this.rightIndexes.end + 18

      this.leftCards = this.data.slice(this.leftIndexes.start, this.leftIndexes.end);
      this.rightCards = this.data.slice(this.rightIndexes.start, this.rightIndexes.end);
    }

  }

  handlePreviousOpening(): void {
    if (this.leftIndexes.start != 0) {
      this.leftIndexes.start = this.leftIndexes.start - 18
      this.leftIndexes.end = this.leftIndexes.end - 18

      this.rightIndexes.start = this.rightIndexes.start - 18
      this.rightIndexes.end = this.rightIndexes.end - 18

      this.leftCards = this.data.slice(this.leftIndexes.start, this.leftIndexes.end);
      this.rightCards = this.data.slice(this.rightIndexes.start, this.rightIndexes.end);
    }
  }

}
