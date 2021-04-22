import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UsuarioService,Usuarios } from '../services/usuarios.service';

@Component({
  selector: 'app-estado-cuenta',
  templateUrl: './estado-cuenta.page.html',
  styleUrls: ['./estado-cuenta.page.scss'],
})
export class EstadoCuentaPage implements OnInit {
  dato_usu: any;
  usuarios: Usuarios[];
  tipo_usuario:any;
  constructor(private storage: Storage,
    private serviceUsuarios: UsuarioService
    ) { }


  ngOnInit() {
    this.storage.get('datos').then(async (val)=>{
      this.dato_usu=val[5];

      if(val[7]=='0'){
        this.tipo_usuario='movil';
      }else if(val[7]=='2'){
        this.tipo_usuario='inquilino';
      }else if(val[7]=='3'){
        this.tipo_usuario='externo';
      }

      await this.serviceUsuarios.getAlertas(val[4],val[1],val[2],val[3]).subscribe(async user=>{
        this.usuarios=user;

      })

    });
  }

}
