import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { QysNuevaPage } from './qys-nueva.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path:'',
        component: QysNuevaPage
      }
    ]
    )   ],
  declarations: [QysNuevaPage]
})
export class QysNuevaPageModule {}
