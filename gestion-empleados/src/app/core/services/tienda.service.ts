import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tienda } from '../../shared/models/tienda.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  private apiUrl = `${environment.apiUrl}/Tienda`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Tienda[]> {
    return this.http.get<Tienda[]>(this.apiUrl);
  }

  getById(id: number): Observable<Tienda> {
    return this.http.get<Tienda>(`${this.apiUrl}/${id}`);
  }

  create(tienda: Tienda): Observable<Tienda> {
    return this.http.post<Tienda>(this.apiUrl, tienda);
  }

  update(id: number, tienda: Tienda) {
  return this.http.put(`${this.apiUrl}/${id}`, tienda);
}


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
