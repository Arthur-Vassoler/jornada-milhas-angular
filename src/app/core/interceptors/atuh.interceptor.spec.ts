import { TestBed } from '@angular/core/testing';

import { AtuhInterceptor } from './atuh.interceptor';

describe('AtuhInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AtuhInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AtuhInterceptor = TestBed.inject(AtuhInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
