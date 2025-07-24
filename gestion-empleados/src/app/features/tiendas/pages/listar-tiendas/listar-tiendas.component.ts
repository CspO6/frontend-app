import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TiendaService } from '../../../../core/services/tienda.service';
import { Tienda } from '../../../../shared/models/tienda.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-tiendas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listar-tiendas.component.html'
})
export class ListarTiendasComponent implements OnInit {
  tiendas: Tienda[] = [];

  constructor(private tiendaService: TiendaService) {}

  ngOnInit(): void {
    this.cargarTiendas();
  }

  cargarTiendas(): void {
    this.tiendaService.getAll().subscribe({
      next: (res) => (this.tiendas = res),
      error: (err) => console.error('Error al cargar tiendas:', err)
    });
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
