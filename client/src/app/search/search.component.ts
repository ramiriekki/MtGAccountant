import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Search } from '../models/Search';
import { SearchService } from '../services/search.service';
import { SetsService } from '../services/sets.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  displayedColumns: string[] = ['name', 'set', 'set_type', 'collector_number', 'rarity', 'prices'];
  parentForm!: FormGroup
  submitted: boolean = false;
  model = new Search();
  sets!: any[any]
  response: any

  rarities = ['common', 'uncommon',
            'rare', 'mythic'];

  constructor(
    private formBuilder: FormBuilder,
    private setService: SetsService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.submitted = false;

    // Parent group init
    this.parentForm = this.formBuilder.group({
      name: new FormControl(),
      rarities: new FormControl(),
      setTypes: new FormControl(),
      minPrice: new FormControl(),
      maxPrice: new FormControl(),
      sets: new FormControl(),
      owned: new FormControl()
    })
    this.getSetCodes()
  }

  getSetCodes(): void {
    this.setService.getSetCodes().subscribe(codes => this.sets = codes)
  }

  onSubmit() {
    console.log(this.parentForm.value);
    this.searchService.searchCards(this.parentForm.value).subscribe(response => this.response = response)
    this.submitted = true;
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

}
