import { Component, inject } from '@angular/core';

import { ApodFavoritesService } from '../../core/services/apod-favorites.service';
import { ApodCardComponent } from '../../shared/components/apod-card/apod-card.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-apod-favorites',
  standalone: true,
  imports: [ApodCardComponent, EmptyStateComponent],
  templateUrl: './apod-favorites.component.html',
  styleUrl: './apod-favorites.component.scss'
})
export class ApodFavoritesComponent {
  private readonly favoritesService = inject(ApodFavoritesService);

  protected readonly favorites = this.favoritesService.favorites;

  protected clearFavorites(): void {
    this.favoritesService.clear();
  }
}