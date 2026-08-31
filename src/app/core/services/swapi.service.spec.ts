import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SwapiService } from './swapi.service';
import { SwapiListResponse, Starship } from '../models/starship.model';

describe('SwapiService', () => {
  let service: SwapiService;
  let httpMock: HttpTestingController;

  const mockPage1: SwapiListResponse<Starship> = {
    count: 2,
    next: 'https://swapi.dev/api/starships/?page=2',
    previous: null,
    results: [{ name: 'X-wing' } as Starship],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SwapiService],
    });
    service = TestBed.inject(SwapiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('fetches a page and reports whether a next page exists', () => {
    service.getPage(1).subscribe((res) => {
      expect(res.results.length).toBe(1);
      expect(service.hasNextPage(1)).toBeTrue();
    });

    const req = httpMock.expectOne('https://swapi.dev/api/starships/?page=1');
    expect(req.request.method).toBe('GET');
    req.flush(mockPage1);
  });

  it('serves a cached page without making a second HTTP request', () => {
    service.getPage(1).subscribe();
    httpMock.expectOne('https://swapi.dev/api/starships/?page=1').flush(mockPage1);

    service.getPage(1).subscribe((res) => {
      expect(res).toEqual(mockPage1);
    });
    httpMock.expectNone('https://swapi.dev/api/starships/?page=1');
  });
});