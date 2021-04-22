import { Component } from '@angular/core';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { UsuarioService } from '../services/usuarios.service';
import { PinService, Pin } from '../services/pin.service';
import { RegistroService, Registro } from '../services/registro.service';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { OnInit, ViewChild, ElementRef} from  '@angular/core';
import { ResidencialesService, Resi } from '../services/residenciales.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage {
  registro: any;
  Reg: Registro[];

 
  constructor( private service: UsuarioService,
              private navCtrl: NavController,
              private servicepin: PinService,
              private serviceregis: RegistroService,
              private residencialservice: ResidencialesService,
              private router: Router) { }

             
              
    myForm= new FormGroup({
      nombre: new FormControl('',[
        Validators.required,
        Validators.minLength(1),
      ]),
      apellido_paterno: new FormControl('',[
        Validators.required,
        Validators.minLength(1),
      ])
      ,apellido_materno: new FormControl('',[
        Validators.required,
        Validators.minLength(1),
      ]),

      correo: new FormControl('',[
        Validators.required,
        Validators.minLength(1),
      ])
      ,up: new FormControl('',[
        Validators.required,
        Validators.minLength(1),
      ])
    });
 
     onSubmit(){
      this.servicepin.pin("10").subscribe((responses)=>{
        if(responses){

              var objPin = (responses);
              var bd_name = objPin['bd_residencial'];
              var bd_user = objPin['bd_usuario'];
              var bd_pdw = objPin['bd_contra'];
              
              this.residencialservice.get("10",bd_name,bd_user,bd_pdw).subscribe((response)=>{
                if(response){
                  var objResi = (response);
                  var id_resi = objResi['id_conjunto'];
                     
                    this.registro={"id_residencial":id_resi,'nombre':this.myForm.value.nombre,
                                   'apellido_paterno':this.myForm.value.apellido_paterno,
                                   'apellido_materno':this.myForm.value.apellido_materno,
                                   'correo':this.myForm.value.correo,
                                   'up':this.myForm.value.up};

                    const men=this.registro;
                    
                    this.serviceregis.create(men,bd_name,bd_user,bd_pdw).subscribe((responsereg)=>{
                      if(responsereg){
                        //console.log(responsereg);
                        this.router.navigate(['/registro-info']);

                        //alert('Registro Exitoso');
                        //this.router.navigate(['/home']);
                      }else{
                        alert('Registro No Exitoso')

                      }
                    })

                }else{
                  alert('Datos Inválidos')
        
                 // console.log('Pin Incorrecto');
        
                }
              })

        }else{
          alert('Datos Inválidos')

         // console.log('Pin Incorrecto');

        }
        
      });

      }
  }

 



