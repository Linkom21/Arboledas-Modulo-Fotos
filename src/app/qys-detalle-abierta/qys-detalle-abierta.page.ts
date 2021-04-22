import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuejasService, Quejas } from '../services/qys.service';
import { MensajeService,Mensaje } from '../services/qys-mensaje.service';
import { ModalController, NavController } from '@ionic/angular';
import { QysNuevoMensajePage } from '../qys-nuevo-mensaje/qys-nuevo-mensaje.page';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-qys-detalle-abierta',
  templateUrl: './qys-detalle-abierta.page.html',
  styleUrls: ['./qys-detalle-abierta.page.scss'],
})
export class QysDetalleAbiertaPage implements OnInit {

  //quejas: Quejas[];
  queja : Quejas[];
  mensajes: Mensaje[];

  constructor(private route:ActivatedRoute,
    private serviceQySAbiertas: QuejasService,
    private serviceMensaje: MensajeService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private storage: Storage) { }

  async ngOnInit() {
    const id= this.route.snapshot.paramMap.get('id');
    //console.log(id);
    this.storage.get('datos').then(async (val)=>{

   await this.serviceQySAbiertas.get(id,val[1],val[2],val[3]).subscribe(response=>{
        
    if(response){
      this.queja=(response);
      this.serviceMensaje.getMensajes(id,val[1],val[2],val[3]).subscribe(response=>{
        //console.log(response);

        this.mensajes=(response);
    
      })

    }else{
      //console.log('No existen registros');
    }
     //console.log(this.queja);
    })
  });
  }
  
  addMensaje(){
    const id= this.route.snapshot.paramMap.get('id');

    this.modalCtrl.create({
      component: QysNuevoMensajePage,
      componentProps:{
        id:id
      }
    })
    .then(modal => {modal.present();
      return modal.onDidDismiss();

    
    } ).then(({data,role}) =>{
      if(role==='created'){
        this.mensajes.push(data);
      }
  } );
  }



}
