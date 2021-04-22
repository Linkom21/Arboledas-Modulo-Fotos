import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { VisitasNuevoPage } from './visitas-nuevo.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path:'',
        component: VisitasNuevoPage
      }
    ]
    )  ],
  declarations: [VisitasNuevoPage]
})
export class VisitasNuevoPageModule {}
