import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../../../shared/models/empleado.model';
import { EmpleadoService } from '../../../../core/services/empleado.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TiendaService } from '../../../../core/services/tienda.service';
import { Tienda } from '../../../../shared/models/tienda.model';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-empleado',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.scss']
})
export class CrearEmpleadoComponent implements OnInit {
  empleado: Empleado = {
    nombre: '',
    apellido: '',
    correo: '',
    cargo: '',
    usuario: '',
    clave: '',
    fechaIngreso: new Date().toISOString().substring(0, 10),
    estaActivo: true,
    tiendaId: undefined,
  };

  tiendas: Tienda[] = [];

  constructor(
    private empleadoService: EmpleadoService,
    private tiendaService: TiendaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tiendaService.getAll().subscribe({
      next: (res) => (this.tiendas = res),
      error: (err) => console.error('Error al cargar tiendas:', err),
    });
  }

  guardarEmpleado(): void {
    const { nombre, apellido, correo, cargo, usuario, clave, tiendaId } = this.empleado;

    if (!nombre || !apellido || !correo || !cargo || !usuario || !clave || !tiendaId) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Por favor, complete todos los campos obligatorios.',
        customClass: {
          popup: 'rounded-lg p-4',
          title: 'text-lg font-semibold text-red-600',
          confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded'
        },
        buttonsStyling: false
      });
      return;
    }

    // Validación adicional de correo
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    if (!correoValido) {
      Swal.fire({
        icon: 'error',
        title: 'Correo inválido',
        text: 'El formato del correo no es válido.',
        customClass: {
          popup: 'rounded-lg p-4',
          title: 'text-lg font-semibold text-red-600',
          confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded'
        },
        buttonsStyling: false
      });
      return;
    }

    this.empleadoService.create(this.empleado).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Empleado creado',
          text: 'El empleado ha sido registrado exitosamente.',
          timer: 2000,
          showConfirmButton: false
        });
        this.router.navigate(['/empleados']);
      },
      error: (error) => {
        console.error('Error al guardar empleado', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo registrar el empleado.',
          customClass: {
            popup: 'rounded-lg p-4',
            title: 'text-lg font-semibold text-red-600',
            confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded'
          },
          buttonsStyling: false
        });
      },
    });
  }
}
