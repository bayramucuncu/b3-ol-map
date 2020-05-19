import { TestBed } from '@angular/core/testing';

import { LayerContainerService } from './layer-container.service';

describe('LayerManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LayerContainerService = TestBed.get(LayerContainerService);
    expect(service).toBeTruthy();
  });
});
