import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { QysMqsCerradasPage } from './qys-mqs-cerradas.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path:'',
        component: QysMqsCerradasPage
      }
    ]
    )  ],
  declarations: [QysMqsCerradasPage]
})
export class QysMqsCerradasPageModule {}
