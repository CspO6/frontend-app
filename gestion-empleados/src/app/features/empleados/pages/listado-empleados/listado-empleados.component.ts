import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Empleado } from '../../../../../../src/app/shared/models/empleado.model';
import { EmpleadoService } from '../../../../core/services/empleado.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-empleados',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './listado-empleados.component.html',
  styleUrls: ['./listado-empleados.component.scss']
})
export class ListadoEmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];

  constructor(
    private empleadoService: EmpleadoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this.empleadoService.getAll().subscribe({
      next: (res) => this.empleados = res,
      error: (err) => console.error('Error al cargar empleados:', err)
    });
  }

  editarEmpleado(id: number): void {
    this.router.navigate(['/empleados/editar', id]);
  }

  eliminarEmpleado(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al empleado permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      buttonsStyling: false, // Desactiva estilos por defecto
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mr-2',
        cancelButton: 'bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadoService.delete(id).subscribe({
          next: () => {
            this.cargarEmpleados();

            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'El empleado ha sido eliminado exitosamente',
              timer: 2000,
              showConfirmButton: false
            });
          },
          error: (error) => {
            console.error('Error al eliminar el empleado', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el empleado'
            });
          }
        });
      }
    });
  }
}
