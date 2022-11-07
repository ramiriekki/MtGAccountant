import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../server.service';
import { Set } from '../set';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.css']
})
export class SetComponent implements OnInit {
  set: Set | undefined = undefined
  data: any[] = []

  constructor(
    private route: ActivatedRoute,
    private serverService: ServerService
  ) { }

  ngOnInit(): void {
    this.getSetData()
  }

  getSetData(): void {
    const set = String(this.route.snapshot.paramMap.get('set'));
    this.serverService.getAllSetCards(set).subscribe(data => this.set = data[1].set[0])
}

}
