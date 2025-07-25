import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Empleado } from '../../../../../../src/app/shared/models/empleado.model';
import { EmpleadoService } from '../../../../core/services/empleado.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { EmpleadoCardComponent } from '../../components/empleado-card/empleado-card';

@Component({
  selector: 'app-listado-empleados',
  standalone: true,
  imports: [CommonModule, EmpleadoCardComponent, RouterModule, FormsModule],
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

  descargarReporteEmpleados(): void {
    this.empleadoService.descargarReporteEmpleados().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'reporte_empleados.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al descargar reporte de empleados', err);
        Swal.fire('Error', 'No se pudo descargar el reporte de empleados.', 'error');
      }
    });
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

  vistaTarjeta: boolean = false;

  alternarVista(): void {
    this.vistaTarjeta = !this.vistaTarjeta;
  }


 eliminarEmpleado(id: number): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará al empleado.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    customClass: {
      confirmButton: 'bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mr-2',
      cancelButton: 'bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded'
    },
    buttonsStyling: false
  }).then(result => {
    if (result.isConfirmed) {
      this.empleadoService.delete(id).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'El empleado ha sido eliminado.',
            customClass: {
              confirmButton: 'bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded'
            },
            buttonsStyling: false
          });
          this.cargarEmpleados();
        },
        error: (error) => {
          const errorMsg = error?.error || 'No se pudo eliminar el empleado.';
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMsg,
            customClass: {
              confirmButton: 'bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded'
            },
            buttonsStyling: false
          });
        }
      });
    }
  });
}
}


