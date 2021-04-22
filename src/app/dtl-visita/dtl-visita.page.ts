import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { VisitasService, Visitas } from '../services/visitas.service';
import { UsuarioService,Usuarios } from '../services/usuarios.service';
import { VisitasRegService, VisitasReg } from '../services/visitas-registro.service';

@Component({
  selector: 'app-dtl-visita',
  templateUrl: './dtl-visita.page.html',
  styleUrls: ['./dtl-visita.page.scss'],
})
export class DtlVisitaPage implements OnInit {
  @Input() id;
  visitas: Visitas[];
  usuarios: Usuarios[];
  visitasreg: any;
  usu: any;
  domi:any;
  nombre_lu:any;
  visitass:any;
  tipo_usu:any;
  constructor(private modalCtrl: ModalController,
    private storage: Storage,
    private serviceVisitas: VisitasService, 
    private serviceUsuarios: UsuarioService,
    private serviceReg: VisitasRegService
    ) { }

    async ngOnInit() {
      this.storage.get('datos').then(async (val)=>{
        //console.log(val);
        this.domi=val[5];
        this.nombre_lu=val[6];

        if(val[7]=='0'){
          this.tipo_usu='movil';
        }else if(val[7]=='2'){
         this.tipo_usu='inquilino';
       }else if(val[7]=='3'){
        this.tipo_usu='externo';
       }
        await this.serviceUsuarios.get(val[4],val[1],val[2],val[3]).subscribe(async user=>{

          var usuarioObject= Object(user);
          let usuarios= usuarioObject as Usuarios;

          await this.serviceVisitas.get(this.id,usuarios.id_residencial,val[1],val[2],val[3]).subscribe(async response=>{
            this.visitass=response;
           // console.log(this.visitass);
            await this.serviceReg.get(this.id,val[1],val[2],val[3]).subscribe(async responses=>{
              this.visitasreg=(responses);
              //console.log(this.visitasreg);
              await this.serviceUsuarios.getAlertas(val[4],val[1],val[2],val[3]).subscribe( useres=>{
                this.usu=(useres);
             // console.log(this.usu);

              })
            })

          })
  
      })
    });
    }


  

  closeModal(){
    this.modalCtrl.dismiss(null,'closed');
  }

}
