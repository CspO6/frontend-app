import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tienda } from '../../shared/models/tienda.model';
import { environment } from '../../../environments/environment';
import { CreateTiendaDTO } from '../../shared/dtos/CreateTiendaDTO';
import { UpdateTiendaDTO } from '../../shared/dtos/UpdateTiendaDTO'; 
@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  private apiUrl = `${environment.apiUrl}/Tienda`;
  private fastApiUrl = 'http://127.0.0.1:8000'; 
  constructor(private http: HttpClient) {}

  getAll(): Observable<Tienda[]> {
    return this.http.get<Tienda[]>(this.apiUrl);
  }

  getById(id: number): Observable<Tienda> {
    return this.http.get<Tienda>(`${this.apiUrl}/${id}`);
  }

 create(tienda: CreateTiendaDTO): Observable<Tienda> {
    return this.http.post<Tienda>(this.apiUrl, tienda);
  }

 update(id: number, tienda: UpdateTiendaDTO): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, tienda);
}


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  descargarReporteTiendas(): Observable<Blob> {
    return this.http.get(`${this.fastApiUrl}/reporte-tiendas-pdf`, {
      responseType: 'blob',
    });
  }
}
