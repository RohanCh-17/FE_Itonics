import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StarshipGridComponent } from './starship-grid.component';
import { Starship } from '../../core/models/starship.model';

describe('StarshipGridComponent', () => {
  let component: StarshipGridComponent;
  let httpMock: HttpTestingController;

  const mockResponse = {
    count: 2,
    next: null,
    previous: null,
    results: [
      { name: 'X-wing' } as Starship,
      { name: 'TIE Fighter' } as Starship,
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarshipGridComponent, HttpClientTestingModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(StarshipGridComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges(); // triggers ngOnInit, which calls loadPage(1)

    // respond to the HTTP call ngOnInit triggered
    const req = httpMock.expectOne('https://swapi.dev/api/starships/?page=1');
    req.flush(mockResponse);
  });

  afterEach(() => httpMock.verify());

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should filter starships by search term', () => {
    expect(component.filteredStarships.length).toBe(2);

    component.searchTerm = 'x-wing';
    expect(component.filteredStarships.length).toBe(1);
    expect(component.filteredStarships[0].name).toBe('X-wing');

    component.searchTerm = 'nonexistent ship';
    expect(component.filteredStarships.length).toBe(0);
  });
});