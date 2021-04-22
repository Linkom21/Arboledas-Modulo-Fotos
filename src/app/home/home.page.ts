import { Component } from '@angular/core';
import { LoadingController, NavController, AlertController, ModalController } from '@ionic/angular';
import { UsuarioService, Usuarios } from '../services/usuarios.service';
import { PinService, Pin } from '../services/pin.service';
import { ResidencialesService, Resi } from '../services/residenciales.service';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { OnInit, ViewChild, ElementRef } from '@angular/core';
import { ContrasenaPage } from '../contrasena/contrasena.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  passwordShow: boolean = false;
  passworType: string = 'password';
  passworToggleIcon = 'eye-off';
  email_fb1: string;
  userEmpty: Usuarios;
  usuario: any;
  contrasenia: any;  

  constructor(private service: UsuarioService,
    private navCtrl: NavController,
    private authService: AuthService,
    private servicepin: PinService,
    private residencialservice: ResidencialesService,
    private storage: Storage,
    private router: Router,
    private modalCtrl: ModalController,

  ) { }

  ngOnInit() {
    this.authService.getUserAuth().subscribe(response => {
      this.email_fb1 = 'ds1@linkom.mx'
      if (this.email_fb1 = response.email) {        
        this.router.navigate(['/inicio']);
        console.log(response)
        console.log("uid:", response.uid)
      } else {
        //alert('No esta logueado')
        this.router.navigate(['/home']);
      }
    });
  }

  public togglePassword() {
    if (this.passwordShow) {
      this.passwordShow = false;
      this.passworType = 'password';
      this.passworToggleIcon = 'eye-off';

    } else {
      this.passwordShow = true;
      this.passworType = 'text';
      this.passworToggleIcon = 'eye';
    }
  }

  myForm = new FormGroup({
    usuario: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    contrasenia: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onSubmit() {

    this.servicepin.pin("10").subscribe((responses) => {
      if (responses) {
        var objPin = (responses);
        var bd_name = objPin['bd_residencial'];
        var bd_user = objPin['bd_usuario'];
        var bd_pdw = objPin['bd_contra'];
        var dominio = objPin['dominio_residencial'];
        var nombre = objPin['nombre'];
        // console.log(responses);

        this.residencialservice.get("10", bd_name, bd_user, bd_pdw).subscribe((response) => {
          if (response) {
            var objResi = (response);
            var id_resi = objResi['id_conjunto'];
            this.service.login(this.myForm.value.usuario, this.myForm.value.contrasenia, id_resi, bd_name, bd_user, bd_pdw).subscribe((response) => {
              if (response) {

                var obj = (response);
                var correo = obj['correo_electronico'];
                var id = obj['id'];
                var tipo = obj['tipo_usuario'];
                var cadena = ["10", bd_name, bd_user, bd_pdw, id, dominio, nombre, tipo];
                this.storage.set('datos', cadena);

                //METODO FIREBASE REGISTRAR USUARIO
                this.authService.register(correo, this.myForm.value.contrasenia).then(res => {
                  console.log("Registro");
                  //METODO FIREBASE LOGEAR USUARIO
                  this.authService.login(correo, this.myForm.value.contrasenia).then(ress => {
                    //OBTENER LOS DATOS DEL USUARIO LOGEADO DE FIREBASE
                    this.authService.getUserAuth().subscribe(usuarioNuevo => {
                      //ACTUALIZAR EL TOKEN O UID DEL USUARIO DE FIREBASE EN MySQL
                      this.service.updateToken(this.userEmpty, id, bd_name, bd_user, bd_pdw, usuarioNuevo.refreshToken);
                      this.router.navigate(['/inicio']);
                    });
                  }).catch(err => alert('Datos Inválidos'));
                }).catch(err =>
                  this.authService.login(correo, this.myForm.value.contrasenia).then(resLogue => {
                    console.log(resLogue);
                    //OBTENER LOS DATOS DEL USUARIO LOGEADO DE FIREBASE
                    this.authService.getUserAuth().subscribe(async usuarioNuevo => {
                      //ACTUALIZAR EL TOKEN O UID DEL USUARIO DE FIREBASE EN MySQL
                      await this.service.updateToken(this.userEmpty, id, bd_name, bd_user, bd_pdw, usuarioNuevo.refreshToken).subscribe(async valor => {
                        await this.authService.update(id, bd_name, bd_user, bd_pdw).subscribe((response_to) => {
                          if (response_to) {
                            this.router.navigate(['/inicio']);
                          } else {
                            alert('Datos Inválidos')
                          }
                        });
                      });                      
                    })                    
                    //this.router.navigate(['/inicio']);
                  }).catch(err => alert('Datos Inválidos'))
                );
              } else {
                alert('Datos Inválidos')
                //console.log('No existe el usuario');
              }
            })
          } else {
            alert('Datos Inválidos')
            //console.log('Conexión Invalida');
          }
        })
      } else {
        alert('Datos Inválidos')
        //console.log('Pin Incorrecto');
      }
    });
  }

  ver() {
    this.modalCtrl
      .create({
        component: ContrasenaPage,
      }).then(modal => {
        modal.present();
        return modal.onDidDismiss();
      }).then(({ data, role }) => {
    });
  }
}




