import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ApodItem } from '../../core/models/apod.model';
import { NasaApodService } from '../../core/services/nasa-apod.service';
import { ApodFavoritesService } from '../../core/services/apod-favorites.service';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';

@Component({
  selector: 'app-apod-detail',
  standalone: true,
  imports: [EmptyStateComponent, LoadingStateComponent, RouterLink],
  templateUrl: './apod-detail.component.html',
  styleUrl: './apod-detail.component.scss'
})
export class ApodDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly nasaApodService = inject(NasaApodService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly favoritesService = inject(ApodFavoritesService);

  protected readonly item = signal<ApodItem | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  constructor() {
    this.route.paramMap
      .pipe(
        map((params) => params.get('date')),
        filter((date): date is string => Boolean(date)),
        switchMap((date) => {
          this.loading.set(true);
          this.error.set(null);

          return this.nasaApodService.getItemByDate(date).pipe(
            catchError(() => {
              this.item.set(null);
              this.error.set('No se encontró el elemento solicitado.');
              this.loading.set(false);
              return of(null);
            })
          );
        }),
        takeUntilDestroyed()
      )
      .subscribe((item) => {
        this.item.set(item);
        this.loading.set(false);
      });
  }

  protected isFavorite(): boolean {
    const currentItem = this.item();
    return currentItem ? this.favoritesService.isFavorite(currentItem.date) : false;
  }

  protected toggleFavorite(): void {
    const currentItem = this.item();

    if (currentItem) {
      this.favoritesService.toggle(currentItem);
    }
  }

  protected mediaUrl(item: ApodItem): SafeResourceUrl | string {
    if (item.media_type === 'video') {
      return this.sanitizer.bypassSecurityTrustResourceUrl(item.url);
    }

    return item.hdurl || item.url;
  }
}