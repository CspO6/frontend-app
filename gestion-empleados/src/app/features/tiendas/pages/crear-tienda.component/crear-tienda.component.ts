import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TiendaService } from '../../../../core/services/tienda.service';
import { Tienda } from '../../../../shared/models/tienda.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

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
      const nuevaTienda: Tienda = this.tiendaForm.value;
      this.tiendaService.create(nuevaTienda).subscribe(() => {
        this.router.navigate(['/tiendas']);
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
