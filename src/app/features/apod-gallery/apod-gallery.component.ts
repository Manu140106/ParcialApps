import { Component, effect, signal } from '@angular/core';

import { ApodItem } from '../../core/models/apod.model';
import { NasaApodService } from '../../core/services/nasa-apod.service';
import { ApodCardComponent } from '../../shared/components/apod-card/apod-card.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';

@Component({
  selector: 'app-apod-gallery',
  standalone: true,
  imports: [ApodCardComponent, EmptyStateComponent, LoadingStateComponent],
  templateUrl: './apod-gallery.component.html',
  styleUrl: './apod-gallery.component.scss'
})
export class ApodGalleryComponent {
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly items = signal<ApodItem[]>([]);
  protected readonly itemCount = signal(9);

  constructor(private readonly nasaApodService: NasaApodService) {
    effect((onCleanup) => {
      this.loading.set(true);
      this.error.set(null);

      const subscription = this.nasaApodService.getLatestItems(this.itemCount()).subscribe({
        next: (items) => {
          this.items.set(items);
          this.loading.set(false);
        },
        error: () => {
          this.items.set([]);
          this.error.set('No se pudo consultar NASA APOD en este momento.');
          this.loading.set(false);
        }
      });

      onCleanup(() => subscription.unsubscribe());
    });
  }

  protected refreshGallery(): void {
    this.itemCount.update((current) => (current === 9 ? 12 : 9));
  }
}