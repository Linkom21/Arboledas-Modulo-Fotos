import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { AlertaNuevaPage } from './alerta-nueva.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path:'',
        component: AlertaNuevaPage
      }
    ]
    )  ],
  declarations: [AlertaNuevaPage]
})
export class AlertaNuevaPageModule {}
