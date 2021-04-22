import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { QysQspCerradasPage } from './qys-qsp-cerradas.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path:'',
        component: QysQspCerradasPage
      }
    ]
    ) 
  ],
  declarations: [QysQspCerradasPage]
})
export class QysQspCerradasPageModule {}
