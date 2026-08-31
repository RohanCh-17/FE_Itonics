import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { SwapiService } from '../../core/services/swapi.service';
import { Starship } from '../../core/models/starship.model';
import { FluidModule } from 'primeng/fluid';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-starship-grid',
  standalone: true,
  imports: [TableModule, CommonModule, FormsModule,RatingModule,FluidModule,ProgressSpinnerModule],
  templateUrl: './starship-grid.component.html',
  styleUrl: './starship-grid.component.css'
})
export class StarshipGridComponent implements OnInit {
  starships: Starship[] = [];
  loading = true;
  currentPage = 1;
  hasMorePages = true;
  searchTerm = '';
  hasError = false;
  errorMessage = '';
  totalCount= 0;

  constructor(private swapiService: SwapiService) {}

  ngOnInit(): void {
    this.loadPage(this.currentPage);
  }
  loadPage(page: number): void {
    this.loading = true;
    this.hasError = false;

    this.swapiService.getPage(page).subscribe({
      next: (response) => {
        this.starships = [...this.starships, ...response.results];
        this.hasMorePages = this.swapiService.hasNextPage(page);
        this.loading = false;
        this.totalCount = response.count;
      },
      error: (err) => {
        console.error('Failed to load starships', err);
        this.loading = false;
        this.hasError = true;
        this.errorMessage = 'Starship crashed. Thankyou for checking this too';
      }
    });
  }

  retry(): void {
    this.loadPage(this.currentPage);
  }

  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    const nearBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 50;

    if (nearBottom && !this.loading && !this.hasError && this.hasMorePages) {
      this.currentPage++;
      this.loadPage(this.currentPage);
    }
  }

  get filteredStarships(): Starship[] {
    if (!this.searchTerm.trim()) {
      return this.starships;
    }
    const term = this.searchTerm.toLowerCase();
    return this.starships.filter(ship => ship.name.toLowerCase().includes(term));
    
  }
  get isInitialLoad(): boolean {
  return this.loading && this.starships.length === 0 && !this.hasError;
}
}