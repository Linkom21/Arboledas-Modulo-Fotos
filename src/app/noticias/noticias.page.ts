import { Component, OnInit } from '@angular/core';
import { NoticiasService,Noticias } from '../services/noticias.service';
import { UsuarioService,Usuarios } from '../services/usuarios.service';
import { async } from '@angular/core/testing';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { DtlnoticiaPage } from '../dtlnoticia/dtlnoticia.page';
import { from } from 'rxjs';
import { DtlnoticiaPageModule } from '../dtlnoticia/dtlnoticia.module';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {
  noticias: Noticias[];
  usuarios: Usuarios[];

  constructor(private serviceNoticias: NoticiasService,
              private serviceUsuarios: UsuarioService, 
              private modalCtrl: ModalController,
              private navCtrl: NavController,
              private alertCtrl: AlertController,
              private storage: Storage) { }


  async ngOnInit() {
    this.storage.get('datos').then(async (val)=>{
     
      await this.serviceUsuarios.get(val[4],val[1],val[2],val[3]).subscribe(async user=>{
        var usuarioObject= Object(user);
        let usuarios= usuarioObject as Usuarios;
          await this.serviceNoticias.traerNoticias(usuarios.id_residencial,usuarios.id,val[1],val[2],val[3]).subscribe(response=>{
            this.noticias=(response);
           // console.log(this.noticias);
          })

      })
    });

        
  }

  

  




ver(noticia : Noticias){
  this.modalCtrl
  .create({
    component: DtlnoticiaPage,
    componentProps: {noticia}

  })
  
  .then(modal => {
    modal.present();
    return modal.onDidDismiss();
  }).then(({data, role})=>{
    this.noticias=this.noticias.filter(std =>{
      if(data.id === std.id){
        return data;
      }
        return std;
    });
  });
}

  
 
 
}
