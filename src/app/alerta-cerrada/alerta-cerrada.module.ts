import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { AlertaCerradaPage } from './alerta-cerrada.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path:'',
        component: AlertaCerradaPage
      }
    ]
    )    ],
  declarations: [AlertaCerradaPage]
})
export class AlertaCerradaPageModule {}
