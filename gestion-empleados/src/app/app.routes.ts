import { Routes } from '@angular/router';
import { CrearEmpleadoComponent } from './features/empleados/pages/crear-empleado/crear-empleado.component';
import { ListadoEmpleadosComponent } from './features/empleados/pages/listado-empleados/listado-empleados.component';
import { EditarEmpleadoComponent } from './features/empleados/pages/editar-empleado/editar-empleado.component';


export const routes: Routes = [
  { path: '', redirectTo: 'empleados', pathMatch: 'full' },
  { path: 'empleados', component: ListadoEmpleadosComponent },
  { path: 'empleados/crear', component: CrearEmpleadoComponent },
  { path: 'empleados/editar/:id', component: EditarEmpleadoComponent },
  {path: 'tiendas', loadComponent: () => import('./features/tiendas/pages/listar-tiendas/listar-tiendas.component').then(m => m.ListarTiendasComponent)},
  {
  path: 'tiendas/crear',
  loadComponent: () =>
    import('./features/tiendas/pages/crear-tienda.component/crear-tienda.component').then(m => m.CrearTiendaComponent),
  },
  {
  path: 'tiendas/editar/:id',
  loadComponent: () =>
    import('./features/tiendas/pages/editar-tienda.component/editar-tienda.component').then(m => m.EditarTiendaComponent),
},
];
