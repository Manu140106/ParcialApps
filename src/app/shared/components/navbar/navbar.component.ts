import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { ApodFavoritesService } from '../../../core/services/apod-favorites.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private readonly favoritesService = inject(ApodFavoritesService);

  protected get favoriteCount(): number {
    return this.favoritesService.favorites().length;
  }
}