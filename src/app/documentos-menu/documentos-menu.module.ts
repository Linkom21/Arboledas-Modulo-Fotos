import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { DocumentosMenuPage } from './documentos-menu.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path:'',
        component: DocumentosMenuPage
      }
    ]
    )
  ],
  declarations: [DocumentosMenuPage]
})
export class DocumentosMenuPageModule {}
