import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TiendaService } from '../../../../core/services/tienda.service';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-tienda',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-tienda.component.html',
})
export class EditarTiendaComponent implements OnInit {
  tiendaForm!: FormGroup;
  tiendaId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private tiendaService: TiendaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tiendaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      direccion: ['', [Validators.required, Validators.maxLength(200)]],
      estaActiva: [false]
    });

    this.route.paramMap.pipe(
      switchMap(params => {
        this.tiendaId = Number(params.get('id'));
        return this.tiendaService.getById(this.tiendaId);
      })
    ).subscribe({
      next: tienda => {
        if (tienda) {
          this.tiendaForm.patchValue(tienda);
        }
      },
      error: () => {
        Swal.fire('Error', 'No se pudo cargar la tienda', 'error');
        this.router.navigate(['/tiendas']);
      }
    });
  }

  actualizarTienda(): void {
    if (this.tiendaForm.valid) {
      const tiendaActualizada = {
        id: this.tiendaId,
        ...this.tiendaForm.value
      };

      this.tiendaService.update(this.tiendaId, tiendaActualizada).subscribe(() => {
        this.router.navigate(['/tiendas']);
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Formulario inválido',
        text: 'Por favor completa todos los campos obligatorios.',
        customClass: {
          popup: 'rounded-lg',
          title: 'text-red-600 text-lg',
          confirmButton: 'bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700'
        }
      });
    }
  }

  eliminarTienda(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la tienda permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#e3342f',
      cancelButtonColor: '#6c757d'
    }).then(result => {
      if (result.isConfirmed) {
        this.tiendaService.delete(this.tiendaId).subscribe({
          next: () => {
            Swal.fire('Eliminada', 'La tienda ha sido eliminada.', 'success');
            this.router.navigate(['/tiendas']);
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar la tienda.', 'error');
          }
        });
      }
    });
  }
}
