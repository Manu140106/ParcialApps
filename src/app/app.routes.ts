import { Routes } from '@angular/router';

import { apodGuard } from './core/guards/apod.guard';
import { ApodDetailComponent } from './features/apod-detail/apod-detail.component';
import { ApodFavoritesComponent } from './features/apod-favorites/apod-favorites.component';
import { ApodGalleryComponent } from './features/apod-gallery/apod-gallery.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    title: 'NASA APOD | Inicio'
  },
  {
    path: 'gallery',
    component: ApodGalleryComponent,
    title: 'NASA APOD | Galería'
  },
  {
    path: 'detail/:date',
    component: ApodDetailComponent,
    title: 'NASA APOD | Detalle'
  },
  {
    path: 'favorites',
    component: ApodFavoritesComponent,
    canMatch: [apodGuard],
    title: 'NASA APOD | Favoritos'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
