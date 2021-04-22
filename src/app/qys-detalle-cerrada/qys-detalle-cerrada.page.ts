import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuejasService, Quejas } from '../services/qys.service';
import { MensajeService,Mensaje } from '../services/qys-mensaje.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-qys-detalle-cerrada',
  templateUrl: './qys-detalle-cerrada.page.html',
  styleUrls: ['./qys-detalle-cerrada.page.scss'],
})
export class QysDetalleCerradaPage implements OnInit {

  quejas: Quejas[];
  queja : any;
  mensajes: any;

  constructor(private route:ActivatedRoute,
    private serviceQySAbiertas: QuejasService,
    private serviceMensaje: MensajeService,
    private storage: Storage) { }

    
  async ngOnInit() {
    const id= this.route.snapshot.paramMap.get('id');
    //console.log(id);
    this.storage.get('datos').then(async (val)=>{

   await this.serviceQySAbiertas.get(id,val[1],val[2],val[3]).subscribe(response=>{
        
    if(response){
      this.queja=(response);
      this.serviceMensaje.getMensajes(id,val[1],val[2],val[3]).subscribe(response=>{
        this.mensajes=(response);
       // console.log(this.mensajes);
    
      })

    }else{
     // console.log('No existen registros');
    }
     //console.log(this.queja);
    })
    
    });
    
    
  }
  
  
}
