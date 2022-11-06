import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Set } from '../set';

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.css']
})
export class SetsComponent implements OnInit {
  sets: Set[] = []

  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
    this.getAllSets()
  }

  getAllSets(): void {
    this.serverService.getAllSets().subscribe(sets => this.sets = sets)
  }

}
