import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../../../shared/models/empleado.model';
import { EmpleadoService } from '../../../../core/services/empleado.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TiendaService } from '../../../../core/services/tienda.service';
import { Tienda } from '../../../../shared/models/tienda.model';
import { CommonModule } from '@angular/common';

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
    this.empleadoService.create(this.empleado).subscribe({
      next: () => {
        this.router.navigate(['/empleados']);
      },
      error: (error) => {
        console.error('Error al guardar empleado', error);
      },
    });
  }
}
