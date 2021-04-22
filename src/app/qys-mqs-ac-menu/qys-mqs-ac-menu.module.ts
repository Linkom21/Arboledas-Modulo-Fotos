import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { QysMqsAcMenuPage } from './qys-mqs-ac-menu.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,

    RouterModule.forChild([
      {
        path:'',
        component: QysMqsAcMenuPage
      }
    ]
    )    ],
  declarations: [QysMqsAcMenuPage]
})
export class QysMqsAcMenuPageModule {}
