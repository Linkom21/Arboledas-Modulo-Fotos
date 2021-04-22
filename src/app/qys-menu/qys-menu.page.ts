import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { QysNuevaPage } from '../qys-nueva/qys-nueva.page';

@Component({
  selector: 'app-qys-menu',
  templateUrl: './qys-menu.page.html',
  styleUrls: ['./qys-menu.page.scss'],
})
export class QysMenuPage implements OnInit {

  constructor(    private alertCtrl: AlertController,
    private modalCtrl: ModalController,) { }

  ngOnInit() {
  }

  addQS(){
    this.modalCtrl.create({
      component: QysNuevaPage
    })
    .then(modal => {modal.present();
      return modal.onDidDismiss();
    
    } );
}
}