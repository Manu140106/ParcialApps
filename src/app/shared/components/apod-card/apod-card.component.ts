import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ApodItem } from '../../../core/models/apod.model';
import { ApodFavoritesService } from '../../../core/services/apod-favorites.service';

@Component({
  selector: 'app-apod-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './apod-card.component.html',
  styleUrl: './apod-card.component.scss'
})
export class ApodCardComponent {
  @Input({ required: true }) item!: ApodItem;

  private readonly favoritesService = inject(ApodFavoritesService);

  protected isFavorite(): boolean {
    return this.favoritesService.isFavorite(this.item.date);
  }

  protected toggleFavorite(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.favoritesService.toggle(this.item);
  }
}