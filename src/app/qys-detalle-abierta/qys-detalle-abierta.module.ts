import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { QysDetalleAbiertaPage } from './qys-detalle-abierta.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path:'',
        component: QysDetalleAbiertaPage
      }
    ]
    )   ],
  declarations: [QysDetalleAbiertaPage]
})
export class QysDetalleAbiertaPageModule {}
