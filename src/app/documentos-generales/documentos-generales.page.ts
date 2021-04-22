import { Component, OnInit } from '@angular/core';
import { UsuarioService,Usuarios} from '../services/usuarios.service';
import { DocumentosService,Documentos } from '../services/documentos.service';
import { CatDocuService,CatDocu } from '../services/cat-docu.service';
import { async } from '@angular/core/testing';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { from } from 'rxjs';
import { DtldocumentoPage } from '../dtldocumento/dtldocumento.page';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-documentos-generales',
  templateUrl: './documentos-generales.page.html',
  styleUrls: ['./documentos-generales.page.scss'],
})
export class DocumentosGeneralesPage implements OnInit {
  documentos: Documentos[];
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

          await this.serviceDocumentos.traerDocumentos(usuarios.id_residencial,usuarios.id,id,val[1],val[2],val[3]).subscribe(response=>{


                this.documentos=(response);

              
              });    
      })
    });
        
  }

  
ver(documento : Documentos){
  this.modalCtrl
  .create({
    component: DtldocumentoPage,
    componentProps: {documento}

  })
  
  .then(modal => {
    modal.present();
    return modal.onDidDismiss();
  }).then(({data, role})=>{
    this.documentos=this.documentos.filter(std =>{
      if(data.id === std.id){
        return data;
      }
        return std;
    });
  });
}

  
 
 
}
