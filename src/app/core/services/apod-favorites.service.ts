import { effect, Injectable, signal } from '@angular/core';

import { ApodItem } from '../models/apod.model';

@Injectable({ providedIn: 'root' })
export class ApodFavoritesService {
  private readonly storageKey = 'parcial-nasa-apod-favorites';
  private readonly favoritesSignal = signal<ApodItem[]>(this.readFavorites());

  readonly favorites = this.favoritesSignal.asReadonly();

  constructor() {
    effect(() => {
      localStorage.setItem(this.storageKey, JSON.stringify(this.favoritesSignal()));
    });
  }

  isFavorite(date: string): boolean {
    return this.favoritesSignal().some((item) => item.date === date);
  }

  toggle(item: ApodItem): void {
    if (this.isFavorite(item.date)) {
      this.remove(item.date);
      return;
    }

    this.add(item);
  }

  add(item: ApodItem): void {
    if (this.isFavorite(item.date)) {
      return;
    }

    this.favoritesSignal.update((current) => [item, ...current]);
  }

  remove(date: string): void {
    this.favoritesSignal.update((current) => current.filter((item) => item.date !== date));
  }

  clear(): void {
    this.favoritesSignal.set([]);
  }

  private readFavorites(): ApodItem[] {
    const storedValue = localStorage.getItem(this.storageKey);

    if (!storedValue) {
      return [];
    }

    try {
      return JSON.parse(storedValue) as ApodItem[];
    } catch {
      return [];
    }
  }
}