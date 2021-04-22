import { Component, OnInit } from '@angular/core';
import { AlertasService, Alertas } from '../services/alertas.service';
import { UsuarioService,Usuarios } from '../services/usuarios.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-alerta-cerrada',
  templateUrl: './alerta-cerrada.page.html',
  styleUrls: ['./alerta-cerrada.page.scss'],
})
export class AlertaCerradaPage implements OnInit {
   
    alertas: Alertas[];
    usuarios: Usuarios[];
    
  constructor(private serviceAlertas: AlertasService, 
    private serviceUsuarios: UsuarioService, 
    private navCtrl: NavController,
    private storage: Storage) { }

  async ngOnInit() {
    this.storage.get('datos').then(async (val)=>{


    await this.serviceUsuarios.get(val[4],val[1],val[2],val[3]).subscribe(async user=>{

      var usuarioObject= Object(user);
      let usuarios= usuarioObject as Usuarios;
      //console.log(usuarios.id);
        await this.serviceAlertas.getAlertasInactivas(usuarios.id_residencial,usuarios.id,val[1],val[2],val[3]).subscribe(response=>{
          this.alertas=(response);
       //   console.log(this.alertas);
      
        })

    })
  });
  }

  detalle(alerta: Alertas){
    this.navCtrl.navigateForward('/alerta-detalle-cerrada/'+alerta.id);

  }

}