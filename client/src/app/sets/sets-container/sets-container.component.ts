import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-sets-container',
    templateUrl: './sets-container.component.html',
    styleUrls: ['./sets-container.component.css'],
})
export class SetsContainerComponent implements OnInit {
    @Input() sortValue!: string;

    constructor() {}

    ngOnInit(): void {}
}
