import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetsContainerComponent } from './sets-container.component';

describe('SetsContainerComponent', () => {
  let component: SetsContainerComponent;
  let fixture: ComponentFixture<SetsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetsContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
