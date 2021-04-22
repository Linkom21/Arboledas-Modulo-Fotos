import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'noticias',
    loadChildren: () => import('./noticias/noticias.module').then( m => m.NoticiasPageModule)
  },
  {
    path: 'documentos',
    loadChildren: () => import('./documentos/documentos.module').then( m => m.DocumentosPageModule)
  },
  {
    path: 'documentos-menu',
    loadChildren: () => import('./documentos-menu/documentos-menu.module').then( m => m.DocumentosMenuPageModule)
  },
  {
    path: 'documentos-personales/:id_categoria',
    loadChildren: () => import('./documentos-personales/documentos-personales.module').then( m => m.DocumentosPersonalesPageModule)
  },
  {
    path: 'qys-menu',
    loadChildren: () => import('./qys-menu/qys-menu.module').then( m => m.QysMenuPageModule)
  },
  {
    path: 'qys-mqs-ac-menu',
    loadChildren: () => import('./qys-mqs-ac-menu/qys-mqs-ac-menu.module').then( m => m.QysMqsAcMenuPageModule)
  },
  {
    path: 'qys-qsp-ac-menu',
    loadChildren: () => import('./qys-qsp-ac-menu/qys-qsp-ac-menu.module').then( m => m.QysQspAcMenuPageModule)
  },
  {
    path: 'qys-mqs-abiertas',
    loadChildren: () => import('./qys-mqs-abiertas/qys-mqs-abiertas.module').then( m => m.QysMqsAbiertasPageModule)
  },
  {
    path: 'qys-mqs-cerradas',
    loadChildren: () => import('./qys-mqs-cerradas/qys-mqs-cerradas.module').then( m => m.QysMqsCerradasPageModule)
  },
  {
    path: 'qys-qsp-abiertas',
    loadChildren: () => import('./qys-qsp-abiertas/qys-qsp-abiertas.module').then( m => m.QysQspAbiertasPageModule)
  },
  {
    path: 'qys-qsp-cerradas',
    loadChildren: () => import('./qys-qsp-cerradas/qys-qsp-cerradas.module').then( m => m.QysQspCerradasPageModule)
  },
  {
    path: 'qys-detalle-abierta/:id',
    loadChildren: () => import('./qys-detalle-abierta/qys-detalle-abierta.module').then( m => m.QysDetalleAbiertaPageModule)
  },
  {
    path: 'qys-detalle-cerrada/:id',
    loadChildren: () => import('./qys-detalle-cerrada/qys-detalle-cerrada.module').then( m => m.QysDetalleCerradaPageModule)
  },
  {
    path: 'alerta-menu',
    loadChildren: () => import('./alerta-menu/alerta-menu.module').then( m => m.AlertaMenuPageModule)
  },
  {
    path: 'alerta-abierta',
    loadChildren: () => import('./alerta-abierta/alerta-abierta.module').then( m => m.AlertaAbiertaPageModule)
  },
  {
    path: 'alerta-cerrada',
    loadChildren: () => import('./alerta-cerrada/alerta-cerrada.module').then( m => m.AlertaCerradaPageModule)
  },
  {
    path: 'alerta-detalle-abierta/:id',
    loadChildren: () => import('./alerta-detalle-abierta/alerta-detalle-abierta.module').then( m => m.AlertaDetalleAbiertaPageModule)
  },
  {
    path: 'alerta-detalle-cerrada/:id',
    loadChildren: () => import('./alerta-detalle-cerrada/alerta-detalle-cerrada.module').then( m => m.AlertaDetalleCerradaPageModule)
  },
  {
    path: 'visitas',
    loadChildren: () => import('./visitas/visitas.module').then( m => m.VisitasPageModule)
  },
  {
    path: 'visitas-nuevo',
    loadChildren: () => import('./visitas-nuevo/visitas-nuevo.module').then( m => m.VisitasNuevoPageModule)
  },
 
  {
    path: 'documentos-generales/:id_categoria',
    loadChildren: () => import('./documentos-generales/documentos-generales.module').then( m => m.DocumentosGeneralesPageModule)
  },
  {
    path: 'documentos2',
    loadChildren: () => import('./documentos2/documentos2.module').then( m => m.Documentos2PageModule)
  },
  {
    path: 'estado-cuenta',
    loadChildren: () => import('./estado-cuenta/estado-cuenta.module').then( m => m.EstadoCuentaPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'registro-info',
    loadChildren: () => import('./registro-info/registro-info.module').then( m => m.RegistroInfoPageModule)
  },
  {
    path: 'contrasena-info',
    loadChildren: () => import('./contrasena-info/contrasena-info.module').then( m => m.ContrasenaInfoPageModule)
  }
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
