import { TestBed } from '@angular/core/testing';

import { B3OlMapService } from './b3-ol-map.service';

describe('B3OlMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: B3OlMapService = TestBed.get(B3OlMapService);
    expect(service).toBeTruthy();
  });
});
