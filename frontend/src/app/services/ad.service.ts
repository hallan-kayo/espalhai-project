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

  getAds(categoryId?: number, status?: string, tipo?: string): Observable<any[]> {
    let params = new HttpParams();
    if (categoryId) params = params.set('categoryId', categoryId.toString());
    if (status) params = params.set('status', status);
    if (tipo && tipo !== 'TODOS') params = params.set('tipo', tipo);
    return this.http.get<any[]>(`${this.apiUrl}/public`, { params });
  }

  getFavorites(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/favorites`);
  }

  toggleFavorite(adId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${adId}/favorite`, {});
  }

  createAd(ad: any): Observable<any> {
    return this.http.post(this.apiUrl, ad);
  }

  updateAd(id: number, ad: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, ad);
  }

  deleteAd(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, null, { params: { status } });
  }

  getMyAds(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/me`);
  }

  getPublicAdsByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}/public`);
  }

  getAdById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getUserPublicProfile(userId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/public/user/${userId}`);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.catUrl);
  }
}
