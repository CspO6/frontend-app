import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../../../app/shared/models/empleado.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EmpleadoService {
 private apiUrl = `${environment.apiUrl}/Empleado`
create(empleado: any) {
  return this.http.post(`${this.apiUrl}`, empleado);
}
delete(id: number) {
  return this.http.delete(`${this.apiUrl}/${id}`);
}
  constructor(private http: HttpClient) {}
getById(id: number): Observable<Empleado> {
  return this.http.get<Empleado>(`${this.apiUrl}/${id}`);
}
update(id: number, empleado: Empleado): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/${id}`, empleado);
}
  getAll(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl);
  }
}
