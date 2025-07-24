import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from '../../../../core/services/empleado.service';
import { Empleado } from '../../../../shared/models/empleado.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TiendaService } from '../../../../core/services/tienda.service';
import { Tienda } from '../../../../shared/models/tienda.model';
import Swal from 'sweetalert2';

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

  tiendas: Tienda[] = [];
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empleadoService: EmpleadoService,
    private tiendaService: TiendaService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.tiendaService.getAll().subscribe({
      next: (data) => {
        this.tiendas = data;
      },
      error: (error) => {
        console.error('Error al cargar tiendas', error);
      }
    });

    this.empleadoService.getById(this.id).subscribe({
      next: (data) => {
        this.empleado = data;

        if (this.empleado.fechaIngreso?.includes('T')) {
          this.empleado.fechaIngreso = this.empleado.fechaIngreso.split('T')[0];
        }
      },
      error: (error) => {
        console.error('Error al obtener empleado', error);
      }
    });
  }

  actualizarEmpleado(): void {
    const camposObligatorios = [
      { campo: this.empleado.nombre, nombre: 'Nombre' },
      { campo: this.empleado.apellido, nombre: 'Apellido' },
      { campo: this.empleado.correo, nombre: 'Correo' },
      { campo: this.empleado.cargo, nombre: 'Cargo' },
      { campo: this.empleado.usuario, nombre: 'Usuario' },
      { campo: this.empleado.clave, nombre: 'Contraseña' },
      { campo: this.empleado.tiendaId, nombre: 'Tienda' },
    ];

    const campoInvalido = camposObligatorios.find(c => !c.campo || c.campo.toString().trim() === '');
    if (campoInvalido) {
      Swal.fire({
        icon: 'warning',
        title: 'Validación requerida',
        text: `El campo "${campoInvalido.nombre}" es obligatorio.`,
        customClass: {
          popup: 'rounded-lg shadow-xl',
          confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        },
        buttonsStyling: false
      });
      return;
    }

    if (this.empleado.fechaIngreso?.includes('T')) {
      this.empleado.fechaIngreso = this.empleado.fechaIngreso.split('T')[0];
    }

    this.empleadoService.update(this.id, this.empleado).subscribe({
      next: () => {
        this.router.navigate(['/empleados']);
      },
      error: (error) => {
        console.error('Error al actualizar empleado', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el empleado.',
          customClass: {
            popup: 'rounded-lg shadow-xl',
            confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
          },
          buttonsStyling: false
        });
      }
    });
  }
}
