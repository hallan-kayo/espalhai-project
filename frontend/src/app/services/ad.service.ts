import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  private apiUrl = 'http://localhost:8080/api/ads';
  private catUrl = 'http://localhost:8080/api/public/categories';

  constructor(private http: HttpClient) {}

  getAds(categoryId?: number, status?: string): Observable<any[]> {
    let params = new HttpParams();
    if (categoryId) params = params.set('categoryId', categoryId.toString());
    if (status) params = params.set('status', status);
    return this.http.get<any[]>(`${this.apiUrl}/public`, { params });
  }

  createAd(ad: any): Observable<any> {
    return this.http.post(this.apiUrl, ad);
  }

  updateStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, null, { params: { status } });
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.catUrl);
  }
}
