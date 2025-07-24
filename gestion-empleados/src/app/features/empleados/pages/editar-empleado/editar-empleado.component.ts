import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from '../../../../core/services/empleado.service';
import { Empleado } from '../../../../shared/models/empleado.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-empleado',
  standalone: true,
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./edita-empleado.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class EditarEmpleadoComponent implements OnInit {
  empleado: Empleado = {
    nombre: '',
    apellido: '',
    correo: '',
    cargo: '',
    usuario: '',
    clave: '',
    fechaIngreso: new Date().toISOString().substring(0, 10),
    estaActivo: true,
    tiendaId: undefined
  };

  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empleadoService: EmpleadoService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.empleadoService.getById(this.id).subscribe({
      next: (data) => {
        this.empleado = data;
      },
      error: (error) => {
        console.error('Error al obtener empleado', error);
      }
    });
  }

  actualizarEmpleado(): void {
    this.empleadoService.update(this.id, this.empleado).subscribe({
      next: () => {
        this.router.navigate(['/empleados']);
      },
      error: (error) => {
        console.error('Error al actualizar empleado', error);
      }
    });
  }
}
