import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalidadeService {
  private ibgeUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades';

  constructor(private http: HttpClient) {}

  getEstados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.ibgeUrl}/estados?orderBy=nome`);
  }

  getCidades(uf: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.ibgeUrl}/estados/${uf}/municipios?orderBy=nome`);
  }
}
