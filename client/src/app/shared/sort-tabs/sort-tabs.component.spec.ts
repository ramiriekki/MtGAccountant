import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortTabsComponent } from './sort-tabs.component';

describe('SortTabsComponent', () => {
    let component: SortTabsComponent;
    let fixture: ComponentFixture<SortTabsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SortTabsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SortTabsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
