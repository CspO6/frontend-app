export interface CreateEmpleadoDTO {
  nombre: string;
  apellido: string;
  correo: string;
  cargo: string;
  fechaIngreso: string;
  estaActivo: boolean;
  tiendaId: number;
}