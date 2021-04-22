import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { DtlVisitaPage } from './dtl-visita.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path:'',
        component: DtlVisitaPage
      }
    ]
    )   ],
  declarations: [DtlVisitaPage]
})
export class DtlVisitaPageModule {}
