export interface Empleado {
  id?: number;
  nombre: string;
  apellido: string;
  correo: string;
  cargo: string;
  fechaIngreso: string;
  estaActivo: boolean;
  tiendaId?: number;
  tiendaNombre?: string;
  tienda?: {
    id: number;
    nombre: string;
  };
}