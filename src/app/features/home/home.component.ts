import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ApodFavoritesService } from '../../core/services/apod-favorites.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly favoritesService = inject(ApodFavoritesService);

  protected readonly favoriteCount = computed(() => this.favoritesService.favorites().length);

  protected readonly highlights = [
    {
      title: 'Imagen diaria de NASA',
      description: 'APOD publica una nueva imagen astronómica cada día junto con su descripción científica.'
    },
    {
      title: 'Exploración espacial',
      description: 'Puedes descubrir galaxias, nebulosas, planetas y otros objetos sorprendentes del universo.'
    },
    {
      title: 'Detalle y favoritos',
      description: 'Cada publicación se puede revisar en detalle y guardar para volver a verla más tarde.'
    }
  ];
}