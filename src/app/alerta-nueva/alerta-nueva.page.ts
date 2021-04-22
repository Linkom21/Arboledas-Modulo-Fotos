import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AlertasService,Alertas } from '../services/alertas.service';
import { NgForm } from '@angular/forms';
import { UsuarioService,Usuarios} from '../services/usuarios.service';
import { Storage } from '@ionic/storage';
import { MensajeService, Mensaje, } from '../services/qys-mensaje.service';

@Component({
  selector: 'app-alerta-nueva',
  templateUrl: './alerta-nueva.page.html',
  styleUrls: ['./alerta-nueva.page.scss'],
})
export class AlertaNuevaPage implements OnInit {
  usuarios: Usuarios[];
  mensa: any;

  constructor(private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private serviceAlerta: AlertasService,
    private serviceUsuarios: UsuarioService, 
    private storage: Storage,
    private serviceMensaje: MensajeService
  ){}

  async ngOnInit() {

    this.storage.get('datos').then(async (val)=>{

    await this.serviceUsuarios.getAlertas(val[4],val[1],val[2],val[3]).subscribe(async user=>{
        this.usuarios=user;
       // console.log(this.usuarios);
    })
  });
  }



  closeModal(){
    this.modalCtrl.dismiss(null,'closed');
  }

  onSubmit_medica(form: NgForm){
   const alerta= form.value;

   this.storage.get('datos').then(async (val)=>{

     this.serviceAlerta.create(alerta,val[1],val[2],val[3]).subscribe(response =>{
      
      var obj = (response);
      var id = obj['id'];

          this.mensa={"id_ticket":id,'id_remitente':form.value.id_usuario,'mensaje':'Médica'};
          const men=this.mensa;
      
             this.serviceMensaje.create(men,val[1],val[2],val[3]).subscribe(responses =>{
              //console.log(responses);
                this.modalCtrl.dismiss(responses,'created')
              }); 
      });
    });

  }


  onSubmit_policia(form: NgForm){
    const alerta= form.value;
     // console.log('Policia');
     this.storage.get('datos').then(async (val)=>{

      this.serviceAlerta.create(alerta,val[1],val[2],val[3]).subscribe(response =>{
        var obj = (response);
        var id = obj['id'];
  
            this.mensa={"id_ticket":id,'id_remitente':form.value.id_usuario,'mensaje':'Vigilancia'};
            const men=this.mensa;
        
               this.serviceMensaje.create(men,val[1],val[2],val[3]).subscribe(responses =>{
               // console.log(responses);
                  this.modalCtrl.dismiss(responses,'created')
                }); 
      });
    });

  }

  onSubmit_mascota(form: NgForm){
    const alerta= form.value;
     // console.log('Mascota');
     this.storage.get('datos').then(async (val)=>{

      this.serviceAlerta.create(alerta,val[1],val[2],val[3]).subscribe(response =>{
        var obj = (response);
        var id = obj['id'];
  
            this.mensa={"id_ticket":id,'id_remitente':form.value.id_usuario,'mensaje':'Mascota'};
            const men=this.mensa;
        
               this.serviceMensaje.create(men,val[1],val[2],val[3]).subscribe(responses =>{
               // console.log(responses);
                  this.modalCtrl.dismiss(responses,'created')
                }); 
      });
    });

  }

  onSubmit_proteccion(form: NgForm){
    const alerta= form.value;
     // console.log('Protección Civil');
     this.storage.get('datos').then(async (val)=>{

      this.serviceAlerta.create(alerta,val[1],val[2],val[3]).subscribe(response =>{
        var obj = (response);
        var id = obj['id'];
  
            this.mensa={"id_ticket":id,'id_remitente':form.value.id_usuario,'mensaje':'Protección Civil'};
            const men=this.mensa;
        
               this.serviceMensaje.create(men,val[1],val[2],val[3]).subscribe(responses =>{
                //console.log(responses);
                  this.modalCtrl.dismiss(responses,'created')
                }); 
      });
    });

  }

  

}
