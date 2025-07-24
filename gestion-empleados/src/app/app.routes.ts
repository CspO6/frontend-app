import { Routes } from '@angular/router';
import { CrearEmpleadoComponent } from './features/empleados/pages/crear-empleado/crear-empleado.component';
import { ListadoEmpleadosComponent } from './features/empleados/pages/listado-empleados/listado-empleados.component';
import { EditarEmpleadoComponent } from './features/empleados/pages/editar-empleado/editar-empleado.component';
import { LoginComponent } from './pages/auth/login/login';
import { authGuard } from '../app/core/guards/auth.guards';

export const routes: Routes = [
  { path: '', redirectTo: 'empleados', pathMatch: 'full' },

  {
    path: 'empleados',
    canActivate: [authGuard],
    component: ListadoEmpleadosComponent
  },
  {
    path: 'empleados/crear',
    canActivate: [authGuard],
    component: CrearEmpleadoComponent
  },
  {
    path: 'empleados/editar/:id',
    canActivate: [authGuard],
    component: EditarEmpleadoComponent
  },

  {
    path: 'tiendas',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/tiendas/pages/listar-tiendas/listar-tiendas.component').then(m => m.ListarTiendasComponent)
  },
  {
    path: 'tiendas/crear',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/tiendas/pages/crear-tienda.component/crear-tienda.component').then(m => m.CrearTiendaComponent)
  },
  {
    path: 'tiendas/editar/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/tiendas/pages/editar-tienda.component/editar-tienda.component').then(m => m.EditarTiendaComponent)
  },

  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' }
];
