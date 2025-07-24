import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from '../../../../core/services/empleado.service';
import { TiendaService } from '../../../../core/services/tienda.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Tienda } from '../../../../shared/models/tienda.model';
import { CreateEmpleadoDTO } from '../../../../shared/dtos/CreateEmpleadoDTO';

@Component({
  selector: 'app-crear-empleado',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.scss']
})
export class CrearEmpleadoComponent implements OnInit {
  empleadoForm!: FormGroup;
  tiendas: Tienda[] = [];

  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    private tiendaService: TiendaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.empleadoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      cargo: ['', Validators.required],
      fechaIngreso: ['', Validators.required],
      estaActivo: [true],
      tiendaId: [null, Validators.required]
    });

    this.tiendaService.getAll().subscribe({
      next: (res) => this.tiendas = res,
      error: (err) => console.error('Error al cargar tiendas:', err)
    });
  }

  guardarEmpleado(): void {
    if (this.empleadoForm.invalid) {
      this.empleadoForm.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Campos inválidos',
        text: 'Por favor, revise los campos del formulario.',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'
        }
      });
      return;
    }

    const formValue = this.empleadoForm.value;

    const empleado: CreateEmpleadoDTO = {
      nombre: formValue.nombre,
      apellido: formValue.apellido,
      correo: formValue.correo,
      cargo: formValue.cargo,
      fechaIngreso: new Date(formValue.fechaIngreso).toISOString(),
      estaActivo: formValue.estaActivo,
      tiendaId: Number(formValue.tiendaId) 
    };

    this.empleadoService.create(empleado).subscribe({
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
          buttonsStyling: false,
          customClass: {
            confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'
          }
        });
      }
    });
  }
}
