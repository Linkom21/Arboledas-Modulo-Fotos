import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { UsuarioService ,Usuarios} from '../services/usuarios.service';
import { NgForm } from '@angular/forms';
import { MensajeService, Mensaje, } from '../services/qys-mensaje.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-qys-nuevo-mensaje',
  templateUrl: './qys-nuevo-mensaje.page.html',
  styleUrls: ['./qys-nuevo-mensaje.page.scss'],
})
export class QysNuevoMensajePage implements OnInit {

  @Input() id;
  usuarios:Usuarios[];
  mensaje:Mensaje[];

  constructor(  private modalCtrl: ModalController,
    private navCtrl: NavController,
    private serviceUsuarios: UsuarioService, 
    private serviceMensaje: MensajeService, 
    private alertCtrl: AlertController,
    private storage: Storage) { }

  async ngOnInit() {

    this.storage.get('datos').then(async (val)=>{

    await this.serviceUsuarios.getAlertas(val[4],val[1],val[2],val[3]).subscribe(async user=>{

        this.usuarios=user;

    })
  });
    
  }

  
  closeModal(){
    this.modalCtrl.dismiss(null,'closed');
  }

  onSubmit_qs(form: NgForm){
    const men= form.value;
          this.storage.get('datos').then(async (val)=>{

            this.serviceMensaje.create(men,val[1],val[2],val[3]).subscribe(response =>{
            this.modalCtrl.dismiss(response,'created')
            //console.log(response);
            });
          });
  
  }
  

}
