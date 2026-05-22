import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { NASA_API_KEY } from '../config/nasa-api';
import { ApodItem } from '../models/apod.model';

@Injectable({ providedIn: 'root' })
export class NasaApodService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://api.nasa.gov/planetary/apod';

  getLatestItems(count = 9): Observable<ApodItem[]> {
    const params = new HttpParams().set('api_key', NASA_API_KEY).set('count', count).set('thumbs', 'true');
    return this.http.get<ApodItem[]>(this.baseUrl, { params });
  }

  getItemByDate(date: string): Observable<ApodItem> {
    const params = new HttpParams().set('api_key', NASA_API_KEY).set('date', date).set('thumbs', 'true');
    return this.http.get<ApodItem>(this.baseUrl, { params });
  }
}