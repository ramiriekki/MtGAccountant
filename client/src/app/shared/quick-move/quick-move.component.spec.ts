import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickMoveComponent } from './quick-move.component';

describe('QuickMoveComponent', () => {
  let component: QuickMoveComponent;
  let fixture: ComponentFixture<QuickMoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickMoveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
