import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinderModifyComponent } from './binder-modify.component';

describe('BinderModifyComponent', () => {
  let component: BinderModifyComponent;
  let fixture: ComponentFixture<BinderModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BinderModifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BinderModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
