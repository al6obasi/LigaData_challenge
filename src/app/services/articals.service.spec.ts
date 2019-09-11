import { TestBed } from '@angular/core/testing';

import { ArticalsService } from './articals.service';

describe('ArticalsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticalsService = TestBed.get(ArticalsService);
    expect(service).toBeTruthy();
  });
});
