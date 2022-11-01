import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log('init')
    this.http.get('http://localhost:3001/collections/my-collection').subscribe(res => {
    console.log('res', res)
  })
  }

}
