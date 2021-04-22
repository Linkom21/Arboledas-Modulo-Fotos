import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertasService, Alertas } from '../services/alertas.service';
import { MensajeService,Mensaje } from '../services/qys-mensaje.service';
import { ModalController, NavController } from '@ionic/angular';
import { QysNuevoMensajePage } from '../qys-nuevo-mensaje/qys-nuevo-mensaje.page';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-alerta-detalle-cerrada',
  templateUrl: './alerta-detalle-cerrada.page.html',
  styleUrls: ['./alerta-detalle-cerrada.page.scss'],
})
export class AlertaDetalleCerradaPage implements OnInit {

  alertas: Alertas[];
  queja : any;
  mensajes: any;

  constructor(private route:ActivatedRoute,
    private serviceAlertas: AlertasService,
    private serviceMensaje: MensajeService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private storage: Storage) { }

  async ngOnInit() {
    const id= this.route.snapshot.paramMap.get('id');
   // console.log(id);
   this.storage.get('datos').then(async (val)=>{

    await this.serviceAlertas.get(id,val[1],val[2],val[3]).subscribe(response=>{
         
        
    if(response){
      this.alertas=(response);
    //  console.log(this.alertas)
      this.serviceMensaje.getMensajes(id,val[1],val[2],val[3]).subscribe(response=>{
        this.mensajes=(response);
    //    console.log(this.mensajes);
    
      })

    }else{
      console.log('No existen registros');
    }
     //console.log(this.queja);
    })
  });
  }
  
  



}
