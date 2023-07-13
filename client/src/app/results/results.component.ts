import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
    @Input() parentForm!: FormGroup;

    constructor() {}

    ngOnInit(): void {}
}
