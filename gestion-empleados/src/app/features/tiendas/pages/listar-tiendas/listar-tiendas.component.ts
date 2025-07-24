import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TiendaService } from '../../../../core/services/tienda.service';
import { Tienda } from '../../../../shared/models/tienda.model';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-tiendas',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './listar-tiendas.component.html'
})
export class ListarTiendasComponent implements OnInit {
  tiendas: Tienda[] = [];
  tiendasFiltradas: Tienda[] = [];
  terminoBusqueda: string = '';

  paginaActual: number = 1;
  elementosPorPagina: number = 5;

  constructor(private tiendaService: TiendaService) {}

  ngOnInit(): void {
    this.cargarTiendas();
  }

  cargarTiendas(): void {
    this.tiendaService.getAll().subscribe({
      next: (res) => {
        this.tiendas = res;
        this.tiendasFiltradas = res;
      },
      error: (err) => console.error('Error al cargar tiendas:', err)
    });
  }

  get tiendasPaginadas(): Tienda[] {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    return this.tiendasFiltradas.slice(inicio, fin);
  }

  get totalPaginas(): number {
    return Math.ceil(this.tiendasFiltradas.length / this.elementosPorPagina);
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

  filtrarTiendas(): void {
    const termino = this.terminoBusqueda.toLowerCase();
    this.tiendasFiltradas = this.tiendas.filter(t =>
      t.nombre.toLowerCase().includes(termino) ||
      t.direccion.toLowerCase().includes(termino)
    );
    this.paginaActual = 1; 
  }

  eliminarTienda(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la tienda permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
        cancelButton: 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.tiendaService.delete(id).subscribe({
          next: () => {
            this.cargarTiendas();
            Swal.fire({
              icon: 'success',
              title: 'Eliminada',
              text: 'La tienda ha sido eliminada.',
              timer: 2000,
              showConfirmButton: false
            });
          },
          error: (err) => {
            const mensaje =
              err?.status === 500
                ? 'No se pudo eliminar la tienda porque tiene empleados.'
                : 'No se pudo eliminar la tienda.';

            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: mensaje
            });
          }
        });
      }
    });
  }
}
