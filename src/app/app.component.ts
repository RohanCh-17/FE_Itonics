import { Component } from '@angular/core';
import { StarshipGridComponent } from './features/starship-grid/starship-grid.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StarshipGridComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {}