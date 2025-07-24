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
  empleadosFiltrados: Empleado[] = [];
  terminoBusqueda: string = '';

  constructor(
    private empleadoService: EmpleadoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this.empleadoService.getAll().subscribe({
      next: (res) => {
        this.empleados = res;
        this.empleadosFiltrados = res; // necesario para mostrar todos inicialmente
      },
      error: (err) => console.error('Error al cargar empleados:', err)
    });
  }

  editarEmpleado(id: number): void {
    this.router.navigate(['/empleados/editar', id]);
  }

 
  paginaActual: number = 1;
  elementosPorPagina: number = 5;


  get empleadosPaginados(): Empleado[] {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    return this.empleadosFiltrados.slice(inicio, fin);
  }


  get totalPaginas(): number {
    return Math.ceil(this.empleadosFiltrados.length / this.elementosPorPagina);
  }

  anteriorPagina(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }


  siguientePagina(): void {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
    }
  }


  filtrarEmpleados(): void {
    const termino = this.terminoBusqueda.toLowerCase();
    this.empleadosFiltrados = this.empleados.filter((emp) =>
      emp.nombre.toLowerCase().includes(termino) ||
      emp.apellido.toLowerCase().includes(termino) ||
      emp.correo.toLowerCase().includes(termino)
    );
    this.paginaActual = 1;
  }

  eliminarEmpleado(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al empleado permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      buttonsStyling: false,
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
