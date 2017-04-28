import { TestBed, inject } from '@angular/core/testing';

import { TweetsService } from './tweets.service';

describe('TweetsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TweetsService]
    });
  });

  it('should ...', inject([TweetsService], (service: TweetsService) => {
    expect(service).toBeTruthy();
  }));
});
