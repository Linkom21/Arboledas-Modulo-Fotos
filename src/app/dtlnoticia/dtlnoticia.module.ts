import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { DtlnoticiaPage } from './dtlnoticia.page';
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
          component: DtlnoticiaPage
        }
      ]
      )    ],
  declarations: [DtlnoticiaPage]
})
export class DtlnoticiaPageModule {}
