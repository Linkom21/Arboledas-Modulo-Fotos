import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { EstadoCuentaPage } from './estado-cuenta.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(
      [
        {
          path:'',
          component: EstadoCuentaPage
        }
      ]
      )    ],
  declarations: [EstadoCuentaPage]
})
export class EstadoCuentaPageModule {}
