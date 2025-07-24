import { Component } from '@angular/core';
import { Empleado } from '../../../../shared/models/empleado.model';
import { EmpleadoService } from '../../../../core/services/empleado.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-empleado',
  standalone: true,
  imports: [FormsModule], // ✅ AÑADIR ESTO
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.scss']
})
export class CrearEmpleadoComponent {
  empleado: Empleado = {
    nombre: '',
    apellido: '',
    correo: '',
    cargo: '',
    usuario: '',
    clave: '',
    fechaIngreso: new Date().toISOString().substring(0, 10), // formato yyyy-MM-dd
    estaActivo: true,
    tiendaId: undefined,
  };

  constructor(private empleadoService: EmpleadoService, private router: Router) {}

  guardarEmpleado(): void {
    this.empleadoService.create(this.empleado).subscribe({
      next: () => {
        this.router.navigate(['/empleados']);
      },
      error: (error) => {
        console.error('Error al guardar empleado', error);
      },
    });
  }
}
