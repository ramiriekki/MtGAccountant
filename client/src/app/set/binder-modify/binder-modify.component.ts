import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card } from 'src/app/models/Card';

@Component({
  selector: 'app-binder-modify',
  templateUrl: './binder-modify.component.html',
  styleUrls: ['./binder-modify.component.css']
})
export class BinderModifyComponent implements OnInit {
  testData: Card[] = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: Card[]) { }

  ngOnInit(): void {


  }

  ngAfterViewInit(): void {
    this.testData = this.data.slice(0, 9);
    console.log(this.testData);

  }

}
