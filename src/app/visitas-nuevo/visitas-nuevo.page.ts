import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { VisitasService, Visitas } from '../services/visitas.service';
import { VisitasRegService, VisitasReg } from '../services/visitas-registro.service';
import { ThrowStmt } from '@angular/compiler';
import { UsuarioService,Usuarios } from '../services/usuarios.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-visitas-nuevo',
  templateUrl: './visitas-nuevo.page.html',
  styleUrls: ['./visitas-nuevo.page.scss'],
})
export class VisitasNuevoPage implements OnInit {
  visitas: Visitas;
  visitasreg: VisitasReg;
  usuario : Usuarios[];
  vi: any;
  vireg: any;
  hora_en:any;
  fecha_en:any;
  fecha_completa:any;
  constructor(private modalCrtl: ModalController,
    private service: VisitasService,
    private serviceReg: VisitasRegService,
    private serviceUsu: UsuarioService,
    private storage: Storage) { }


  async ngOnInit() {
    this.storage.get('datos').then(async (val)=>{

    await this.serviceUsu.getAlertas(val[4],val[1],val[2],val[3]).subscribe(async user=>{
      this.usuario=user;
      //console.log(this.usuario);
      

    })
    
  });
  }

  closeModal(){
    this.modalCrtl.dismiss(null,'closed');
  }


  onSubmit(form: NgForm){
    
    //fecha
    var str = form.value.fecha; 
    var splitted = str.split("-", 3); 

    var str1 = splitted[2]; 
    var splitted1 = str1.split("T", 3); 


    this.fecha_en=splitted[0]+'-'+splitted[1]+'-'+splitted1[0];

    //hora

    var str3 = form.value.hora1; 
    var splitted3 = str3.split("-", 3); 

    var str4 = splitted3[2]; 
    var splitted4 = str4.split("T", 3); 

    var str5 = splitted4[1]; 
    var splitted5 = str5.split(":", 3); 


    this.hora_en=splitted5[0]+':'+splitted5[1]+':00';
    this.fecha_completa =this.fecha_en+' '+this.hora_en;

    this.storage.get('datos').then(async (val)=>{

      this.vi={"id_residencial":form.value.id_residencial,'id_usuario':form.value.id_usuario,'nombre_visita':form.value.nombre_visita};
      const visitas=this.vi;

            this.service.create(visitas,val[1],val[2],val[3]).subscribe(response =>{
              //console.log(response);
              var obj = (response);
             var id = obj['id'];
              

                  this.vireg={"id_visita":id,'fecha_entrada':this.fecha_completa,'fecha_salida':form.value.hora2};
                  const visita_registro=this.vireg;
                console.log(visita_registro);
                     this.serviceReg.create(visita_registro,val[1],val[2],val[3]).subscribe(responses =>{
                     // console.log(responses);
                       this.modalCrtl.dismiss(responses,'created')
                     });

             });
  
    });
}

}
