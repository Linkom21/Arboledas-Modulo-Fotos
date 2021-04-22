import { Component, OnInit, Input } from '@angular/core';
import { MenuController, AlertController, ModalController } from '@ionic/angular';
import { UsuarioService, Usuarios  } from '../services/usuarios.service';
import { AuthService } from '../services/auth.service';
import { AlertaNuevaPage } from '../alerta-nueva/alerta-nueva.page';
import { AlertasService,Alertas } from '../services/alertas.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
 
  
 usuario: Usuarios[];
 alertas: AlertasService[];
 nombre: any;
 email_fb:string;
 tokenUsuario: string;

  constructor( private menu: MenuController,
    private service: UsuarioService,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private serviceAlertas : AlertasService,
    private storage: Storage,
    private router: Router,
    ) { }

  ngOnInit() {

    this.authService.getUserAuth().subscribe(response=>{
      this.email_fb='ds1@linkom.mx'
     
      if( this.email_fb=response.email){
        this.router.navigate(['/inicio']);
        this.authService.getUserAuth().subscribe(usuario => {
          //ACTUALIZAR y OBTENER EL TOKEN DEL USUARIO DE FIREBASE
          this.tokenUsuario = usuario.refreshToken as string;      
          console.log(this.tokenUsuario)
        })    
    
        
        console.log(response)        
      }else{
        //alert('No esta logueado')
        this.router.navigate(['/home']);

      }
    });

    this.storage.get('datos').then(async (val)=>{
      this.nombre=val[6];
      //console.log(val);
      await this.service.getAlertas(val[4],val[1],val[2],val[3]).subscribe(async user=>{
        this.usuario=user;
       // console.log(this.usuario);

      })

      });
    
  }

 

  addAlerta(){
    

  this.modalCtrl.create({
    component: AlertaNuevaPage
  })
  .then(modal => {modal.present();
    return modal.onDidDismiss();
  
  } );
}


  cerrar_sesion(){
    

    this.authService.logout();
    this.storage.remove('datos');
    this.storage.clear();
  }

 openFirst(){
this.menu.enable(true, 'first');
this.menu.open('first');
 }
openEnd() {
  this.menu.open('end');
}
openCustom() {
  this.menu.enable(true, 'custom');
this.menu.open('custom');
}

}
