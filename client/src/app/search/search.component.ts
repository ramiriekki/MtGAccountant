import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Search } from '../models/Search';
import { SetsService } from '../services/sets.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  parentForm!: FormGroup
  submitted: boolean = false;
  model = new Search();
  sets!: any[any]

  rarities = ['common', 'uncommon',
            'rare', 'mythic'];

  constructor(
    private formBuilder: FormBuilder,
    private setService: SetsService
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
    
    this.submitted = true; 
  }

}
