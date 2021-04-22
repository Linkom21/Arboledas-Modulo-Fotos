import { Component, OnInit } from '@angular/core';
import { QuejasService, Quejas, } from '../services/qys.service';
import { UsuarioService,Usuarios } from '../services/usuarios.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-qys-qsp-cerradas',
  templateUrl: './qys-qsp-cerradas.page.html',
  styleUrls: ['./qys-qsp-cerradas.page.scss'],
})

export class QysQspCerradasPage implements OnInit {
   
    queja: Quejas[];
    usuarios: Usuarios[];

  constructor(private serviceQySAbiertas: QuejasService, 
              private serviceUsuarios: UsuarioService, 
              private navCtrl: NavController,
              private storage: Storage) { }



    

  async ngOnInit() {
      this.storage.get('datos').then(async (val)=>{

    await this.serviceUsuarios.get(val[4],val[1],val[2],val[3]).subscribe(async user=>{

      var usuarioObject= Object(user);
      let usuarios= usuarioObject as Usuarios;
      //console.log(usuarios.id);
        await this.serviceQySAbiertas.getQuejasPublicasCerradas(usuarios.id_residencial,val[1],val[2],val[3]).subscribe(response=>{
          this.queja=(response);
        //  console.log(this.noticias);
      
        })

    })
  });
  }

  detalle(quejas : Quejas){
    //this.navCtrl.navigateForward('/qys-detalle-cerrada/1');
    this.navCtrl.navigateForward('/qys-detalle-cerrada/'+quejas.id);

  }

}