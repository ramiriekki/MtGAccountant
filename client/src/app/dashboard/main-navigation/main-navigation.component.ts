import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-main-navigation',
    templateUrl: './main-navigation.component.html',
    styleUrls: ['./main-navigation.component.css'],
})
export class MainNavigationComponent implements OnInit {
    @Input()
    isAdmin: boolean = false;

    constructor() {}

    ngOnInit(): void {}
}
