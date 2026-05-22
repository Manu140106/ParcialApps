import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { ApodFavoritesService } from '../services/apod-favorites.service';

export const apodGuard: CanActivateFn = () => {
  const favoritesService = inject(ApodFavoritesService);
  const router = inject(Router);

  if (favoritesService.favorites().length > 0) {
    return true;
  }

  return router.createUrlTree(['/gallery'], {
    queryParams: { access: 'favorites-required' }
  });
};