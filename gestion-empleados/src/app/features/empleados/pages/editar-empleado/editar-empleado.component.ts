import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from '../../../../core/services/empleado.service';
import { TiendaService } from '../../../../core/services/tienda.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Tienda } from '../../../../shared/models/tienda.model';
import Swal from 'sweetalert2';
import { UpdateEmpleadoDTO } from '../../../../shared/dtos/UpdateEmpleadoDTO';

@Component({
  selector: 'app-editar-empleado',
  standalone: true,
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./edita-empleado.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class EditarEmpleadoComponent implements OnInit {
  empleadoForm!: FormGroup;
  tiendas: Tienda[] = [];
  id!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private empleadoService: EmpleadoService,
    private tiendaService: TiendaService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.empleadoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      cargo: ['', Validators.required],
      fechaIngreso: [new Date().toISOString().substring(0, 10), Validators.required],
      estaActivo: [true],
      tiendaId: [undefined, Validators.required]
    });

    this.tiendaService.getAll().subscribe({
      next: (res) => (this.tiendas = res),
      error: (err) => console.error('Error al cargar tiendas:', err),
    });

    this.empleadoService.getById(this.id).subscribe({
      next: (data) => {
        if (data.fechaIngreso?.includes('T')) {
          data.fechaIngreso = data.fechaIngreso.split('T')[0];
        }
        this.empleadoForm.patchValue(data);
      },
      error: (err) => console.error('Error al obtener empleado:', err)
    });
  }

  actualizarEmpleado(): void {
    if (this.empleadoForm.invalid) {
      this.empleadoForm.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Campos inválidos',
        text: 'Por favor complete todos los campos obligatorios.',
        customClass: {
          popup: 'rounded-lg shadow-xl',
          confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        },
        buttonsStyling: false
      });
      return;
    }

    const formValue = this.empleadoForm.value;

    const empleado: UpdateEmpleadoDTO = {
      nombre: formValue.nombre,
      apellido: formValue.apellido,
      correo: formValue.correo,
      cargo: formValue.cargo,
      fechaIngreso: new Date(formValue.fechaIngreso).toISOString(),
      estaActivo: formValue.estaActivo,
      tiendaId: Number(formValue.tiendaId)
    };

    this.empleadoService.update(this.id, empleado).subscribe({
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
