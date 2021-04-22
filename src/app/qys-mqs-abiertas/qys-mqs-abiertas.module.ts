import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { QysMqsAbiertasPage } from './qys-mqs-abiertas.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path:'',
        component: QysMqsAbiertasPage
      }
    ]
    )    ],
  declarations: [QysMqsAbiertasPage]
})
export class QysMqsAbiertasPageModule {}
