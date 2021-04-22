import { Component, OnInit } from '@angular/core';
import { QuejasService, Quejas, } from '../services/qys.service';
import { UsuarioService,Usuarios } from '../services/usuarios.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-qys-mqs-abiertas',
  templateUrl: './qys-mqs-abiertas.page.html',
  styleUrls: ['./qys-mqs-abiertas.page.scss'],
})
export class QysMqsAbiertasPage implements OnInit {
   
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
        await this.serviceQySAbiertas.getQuejasPrivadasAbiertas(usuarios.id_residencial,usuarios.id,val[1],val[2],val[3]).subscribe(response=>{
          this.queja=(response);
        //  console.log(this.noticias);
      
        })

    })

  });
  }

  detalle(quejas : Quejas){
    this.navCtrl.navigateForward('/qys-detalle-abierta/'+quejas.id);

  }

}