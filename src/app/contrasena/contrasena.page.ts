import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PinService, Pin } from '../services/pin.service';
import { ResidencialesService, Resi } from '../services/residenciales.service';
import { UsuarioService,Usuarios } from '../services/usuarios.service';


@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.page.html',
  styleUrls: ['./contrasena.page.scss'],
})
export class ContrasenaPage implements OnInit {
 // usu: Usuarios[];
  usu:any;

  constructor(private modalCtrl: ModalController,
             private servicepin: PinService,
              private residencialservice: ResidencialesService,
              private service: UsuarioService,
              private router: Router) { }

  ngOnInit() {
  }

  myForm= new FormGroup({
   
    correo: new FormControl('',[
      Validators.required,
      Validators.minLength(6),
    ])
  });

  closeModal(){
    this.modalCtrl.dismiss(null,'closed');
  }

   onSubmit(){

        this.servicepin.pin("10").subscribe((responses)=>{
          if(responses){

                var objPin = (responses);
                var bd_name = objPin['bd_residencial'];
                var bd_user = objPin['bd_usuario'];
                var bd_pdw = objPin['bd_contra'];
                var dominio = objPin['dominio_residencial'];
                var nombre = objPin['nombre'];
               // console.log(responses);

            this.residencialservice.get("10",bd_name,bd_user,bd_pdw).subscribe((response)=>{
              if(response){
                var objResi = (response);
                var id_resi = objResi['id_conjunto'];
                    this.service.correo(this.myForm.value.correo,id_resi,bd_name,bd_user,bd_pdw).subscribe((responseCorreo)=>{
                      if(responseCorreo){

                        var objCorreo = (responseCorreo);
                        var id_usu = objCorreo['id'];
                        console.log(id_usu);

                        this.usu={'id':'1','usuario':'1','contrasenia':'1','id_residencial':'1','id_usuario':'1'};

                            this.service.updateContra(this.usu,id_usu,bd_name,bd_user,bd_pdw).subscribe((responseCon)=>{
                              if(responseCon){
                                var objRes = (responseCon);
                                var esta = objRes['status'];

                                if(esta="success"){
                                  //console.log("bien");
                                  this.modalCtrl.dismiss(null,'closed');

                                  this.router.navigate(['/contrasena-info']);

                                }else{
                                  alert('Datos Inválidos')

                                  //console.log(responseCon);

                                }
                              }else{
                                alert('Datos Inválidos')
                                //console.log('No existe el usuario');
                              }
                         })

                      }else{
                        alert('Datos Inválidos')
                        //console.log('No existe el usuario');
                      }
                  })
              }else{
                alert('Datos Inválidos')
                 //console.log('Conexión Invalida');

              }
            })
          }else{
            alert('Datos Inválidos')

           // console.log('Pin Incorrecto');

          }
          
        });
        

      }


  

}
