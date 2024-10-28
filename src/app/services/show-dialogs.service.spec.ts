import { TestBed } from '@angular/core/testing';

import { ShowDialogsService } from './show-dialogs.service';

describe('ShowDialogsService', () => {
  let service: ShowDialogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowDialogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
