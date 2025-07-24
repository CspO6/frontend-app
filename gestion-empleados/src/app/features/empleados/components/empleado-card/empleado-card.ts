import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Empleado } from '../../../../shared/models/empleado.model';

@Component({
  selector: 'app-empleado-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empleado-card.html',
  styleUrls: ['./empleado-card.scss']
})
export class EmpleadoCardComponent {
  @Input() empleado!: Empleado;
}
