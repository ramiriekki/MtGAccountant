import { TestBed } from '@angular/core/testing';

import { SortCardsService } from './sort-cards.service';

describe('SortCardsService', () => {
  let service: SortCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
