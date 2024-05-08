import { TestBed } from '@angular/core/testing';

import { CampusConsumerService } from './campus-consumer.service';

describe('CampusConsumerService', () => {
  let service: CampusConsumerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampusConsumerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
