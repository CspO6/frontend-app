import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TiendaService } from '../../../../core/services/tienda.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { CreateTiendaDTO } from '../../../../shared/dtos/CreateTiendaDTO';

@Component({
  selector: 'app-crear-tienda',
  templateUrl: './crear-tienda.component.html',
  styleUrls: ['./crear-tienda.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class CrearTiendaComponent {
  tiendaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tiendaService: TiendaService,
    private router: Router
  ) {
    this.tiendaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      direccion: ['', [Validators.required, Validators.maxLength(200)]],
      estaActiva: [true]
    });
  }

  crearTienda() {
    if (this.tiendaForm.valid) {
      const nuevaTienda: CreateTiendaDTO = this.tiendaForm.value;

      this.tiendaService.create(nuevaTienda).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Tienda creada',
            text: 'La tienda se ha creado exitosamente.',
            timer: 2000,
            showConfirmButton: false
          });
          this.router.navigate(['/tiendas']);
        },
        error: (err) => {
          console.error('Error al crear tienda:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo crear la tienda.',
            customClass: {
              confirmButton: 'bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded'
            }
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor complete todos los campos obligatorios.',
        customClass: {
          confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded',
        }
      });
    }
  }
}
