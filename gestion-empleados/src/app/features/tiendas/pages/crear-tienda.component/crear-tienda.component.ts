import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TiendaService } from '../../../../core/services/tienda.service';
import { Tienda } from '../../../../shared/models/tienda.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-crear-tienda',
  templateUrl: './crear-tienda.component.html',
  styleUrls: ['./crear-tienda.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class CrearTiendaComponent {
  tiendaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tiendaService: TiendaService,
    private router: Router
  ) {
    this.tiendaForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      estaActiva: [true]
    });
  }

  crearTienda() {
    if (this.tiendaForm.valid) {
      const nuevaTienda: Tienda = this.tiendaForm.value;
      this.tiendaService.create(nuevaTienda).subscribe(() => {
        this.router.navigate(['/tiendas']);
      });
    }
  }
}
