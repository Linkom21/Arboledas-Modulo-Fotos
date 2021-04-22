import { Component, OnInit } from '@angular/core';
import { VisitasService, Visitas } from '../services/visitas.service';
import { UsuarioService,Usuarios } from '../services/usuarios.service';
import { NavController, ModalController } from '@ionic/angular';
import { VisitasNuevoPage } from '../visitas-nuevo/visitas-nuevo.page';
import { DtlVisitaPage } from '../dtl-visita/dtl-visita.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.page.html',
  styleUrls: ['./visitas.page.scss'],
})
export class VisitasPage implements OnInit {
   
    visitas: Visitas[];
    usuarios: Usuarios[];
    
  constructor(private serviceVisitas: VisitasService, 
    private serviceUsuarios: UsuarioService, 
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private storage: Storage) { }

  async ngOnInit() {
    this.storage.get('datos').then(async (val)=>{
      await this.serviceUsuarios.get(val[4],val[1],val[2],val[3]).subscribe(async user=>{

      var usuarioObject= Object(user);
      let usuarios= usuarioObject as Usuarios;
     // console.log(usuarios.id);
        await this.serviceVisitas.traerVisita(usuarios.id_residencial,usuarios.id,val[1],val[2],val[3]).subscribe(response=>{
          this.visitas=(response);
         // console.log(this.visitas);
      
        })

    })
  });
  }


  addVisita(){
    this.modalCtrl.create({
      component: VisitasNuevoPage
    })
    .then(modal => {modal.present();
      return modal.onDidDismiss();
    }).then(({data,role}) =>{
        if(role==='created'){
          this.visitas.push(data);
        }
    } );
}

verVisita(id_visita){

  this.modalCtrl.create({
    component: DtlVisitaPage,
    componentProps:{
      id:id_visita
    }
  })
  .then(modal => {modal.present();
    return modal.onDidDismiss();

  
  } ).then(({data,role}) =>{
    if(role==='created'){
      //this.mensajes.push(data);
    }
} );
}




  
}