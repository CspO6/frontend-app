export interface Empleado {
  id?: number;
  nombre: string;
  apellido: string;
  correo: string;
  cargo: string;
  usuario: string;
  clave: string;
  fechaIngreso: string;
  estaActivo: boolean;
  tiendaId?: number;
  tienda?: {
    nombre: string;
  };
}