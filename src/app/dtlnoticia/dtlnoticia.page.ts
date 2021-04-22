import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { NoticiasService, Noticias } from '../services/noticias.service';
import { ThrowStmt } from '@angular/compiler';
import { strict } from 'assert';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-dtlnoticia',
  templateUrl: './dtlnoticia.page.html',
  styleUrls: ['./dtlnoticia.page.scss'],
})
export class DtlnoticiaPage implements OnInit {

 noticia: Noticias;
   isUpdate = true;
    data : any; 
    tipo_usuario:any;
    dominio:any;
 
  constructor(private modalCrtl: ModalController,
              private service: NoticiasService,
              private storage: Storage) { }

  ngOnInit() {

    this.storage.get('datos').then(async (val)=>{
      this.dominio=val[5];

      
      
    });
    if(this.noticia){
      
      this.data=this.noticia;
    }
    
  }

  closeModal(){
    this.modalCrtl.dismiss(null,'closed');
  }

}
