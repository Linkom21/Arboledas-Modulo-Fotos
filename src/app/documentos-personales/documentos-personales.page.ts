import { Component, OnInit } from '@angular/core';
import { UsuarioService,Usuarios} from '../services/usuarios.service';
import { DocumentosService,Documentos } from '../services/documentos.service';
import { async } from '@angular/core/testing';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { from } from 'rxjs';
import { DtldocumentoPersonalesPage } from '../dtldocumento-personales/dtldocumento-personales.page';
import { ActivatedRoute } from '@angular/router';
import { CatDocuService,CatDocu } from '../services/cat-docu.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-documentos-personales',
  templateUrl: './documentos-personales.page.html',
  styleUrls: ['./documentos-personales.page.scss'],
})
export class DocumentosPersonalesPage implements OnInit {
  documentos_per: Documentos[];
  usuarios: Usuarios[];
  catdocu: CatDocu[];
  constructor(private serviceDocumentos: DocumentosService,
              private serviceUsuarios: UsuarioService, 
              private modalCtrl: ModalController,
              private navCtrl: NavController,
              private alertCtrl: AlertController,  
              private CatDocuServices: CatDocuService,
              private route:ActivatedRoute,
              private storage: Storage) { }

    async ngOnInit() {
      const id= this.route.snapshot.paramMap.get('id_categoria');
  
      this.storage.get('datos').then(async (val)=>{
  
        await this.CatDocuServices.get(id,val[1],val[2],val[3]).subscribe(response=>{
          this.catdocu=(response);
          //console.log(this.catdocu);
      
        })
  
       
  
      });    
  
      
      this.storage.get('datos').then(async (val)=>{
        await this.serviceUsuarios.get(val[4],val[1],val[2],val[3]).subscribe(async user=>{
  
          var usuarioObject= Object(user);
          let usuarios= usuarioObject as Usuarios;
  
            await this.serviceDocumentos.traerDocumentos2(usuarios.id_residencial,usuarios.id,id,val[1],val[2],val[3]).subscribe(response=>{
  
  
                  this.documentos_per=(response);
  
                
                });    
        })
      });
          
    }


  



  ver(documento_per : Documentos){
    this.modalCtrl
    .create({
      component: DtldocumentoPersonalesPage,
      componentProps: {documento_per}
  
    })
    
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    }).then(({data, role})=>{
      this.documentos_per=this.documentos_per.filter(std =>{
        if(data.id === std.id){
          return data;
        }
          return std;
      });
    });
  }
  
    
  
 
 
}
