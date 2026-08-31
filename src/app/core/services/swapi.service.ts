
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SWAPI_BASE_URL, SWAPI_RESOURCE } from '../constants/api.constants';
import { Starship, SwapiListResponse } from '../models/starship.model';

@Injectable({ providedIn: 'root' })
export class SwapiService {
  private pageCache = new Map<number, SwapiListResponse<Starship>>();

  constructor(private http: HttpClient) {}

  getPage(page: number): Observable<SwapiListResponse<Starship>> {
    const cached = this.pageCache.get(page);
    if (cached) {
      return of(cached);
    }

    const url = `${SWAPI_BASE_URL}/${SWAPI_RESOURCE}/?page=${page}`;
    return this.http.get<SwapiListResponse<Starship>>(url).pipe(
      tap((response) => this.pageCache.set(page, response))
    );
  }
  hasNextPage(page: number): boolean {
    return !!this.pageCache.get(page)?.next;
  }
  clearCache(): void {
    this.pageCache.clear();
  }
}
