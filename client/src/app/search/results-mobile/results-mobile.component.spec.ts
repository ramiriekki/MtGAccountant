import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsMobileComponent } from './results-mobile.component';

describe('ResultsMobileComponent', () => {
  let component: ResultsMobileComponent;
  let fixture: ComponentFixture<ResultsMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
