import { TestBed } from '@angular/core/testing';

import { BasicAuthHttpInterceptorService } from './basic-auth-http-intercept.service';

describe('BasicAuthHttpInterceptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BasicAuthHttpInterceptorService = TestBed.get(BasicAuthHttpInterceptorService);
    expect(service).toBeTruthy();
  });
});
