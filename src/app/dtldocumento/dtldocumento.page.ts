import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { DocumentosService, Documentos } from '../services/documentos.service';
import { ThrowStmt } from '@angular/compiler';
import { strict } from 'assert';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-dtldocumento',
  templateUrl: './dtldocumento.page.html',
  styleUrls: ['./dtldocumento.page.scss'],
})
export class DtldocumentoPage implements OnInit {

 documento: Documentos;
   isUpdate = true;
    data : any;  

    dominio:any;

  constructor(private modalCrtl: ModalController,
              private service: DocumentosService,
              private storage: Storage) { }

  ngOnInit() {

     this.storage.get('datos').then(async (val)=>{
      this.dominio=val[5];
      
    });
    if(this.documento){
      
      this.data=this.documento;
    }
    
  }

  closeModal(){
    this.modalCrtl.dismiss(null,'closed');
  }

}
