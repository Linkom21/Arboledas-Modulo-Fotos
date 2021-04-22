import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DepartamentosService,Departamentos} from '../services/departamentos.service';
import { QuejasService, Quejas, Images, } from '../services/qys.service';
import { MensajeService, Mensaje, } from '../services/qys-mensaje.service';
import { UsuarioService,Usuarios } from '../services/usuarios.service';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { JsonPipe } from '@angular/common';
import { parse } from 'path';
import { Storage } from '@ionic/storage';
import { AngularFireStorage } from '@angular/fire/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-qys-nueva',
  templateUrl: './qys-nueva.page.html',
  styleUrls: ['./qys-nueva.page.scss'],
})
export class QysNuevaPage implements OnInit {
  departamentos: Departamentos[];
  usuarios: Usuarios[];
  que: any;
  mensa: any;
  image = '';
  imagePath: string;  
  upload: any;

constructor( private serviceDepa: DepartamentosService,
    private serviceQueja: QuejasService,
    private serviceMensaje: MensajeService,
    private serviceUsua: UsuarioService, 
    private modalCtrl: ModalController,
    private storage: Storage,
    public afSG: AngularFireStorage,
    public alertController: AlertController,
    private camera: Camera,
    public loadingController: LoadingController,

  ) { }
 data = {
    foto_uno: '',
   // foto_dos: '',
  }

  ngOnInit() {

    this.storage.get('datos').then(async (val)=>{

    this.serviceDepa.getAll(val[1],val[2],val[3]).subscribe(response =>{
        //console.log(response);

        if(response){
          this.departamentos=response;

          this.serviceUsua.getAlertas(val[4],val[1],val[2],val[3]).subscribe( user=>{
           //console.log(user);
            this.usuarios=user;
        })
        }
    })

  });
    }

  onSubmit_qs(form: NgForm){
    this.storage.get('datos').then(async (val)=>{

      this.que={"id_residencial":form.value.id_residencial,'id_usuario':form.value.id_usuario,'id_departamento':form.value.id_departamento,'titulo':form.value.titulo,'publico':form.value.publico,'descripcion':form.value.descripcion};
      const quejas=this.que;

            this.serviceQueja.create(quejas,val[1],val[2],val[3]).subscribe(response =>{
              
              var obj = (response);
              var id = obj['id'];
              //console.log(response);

                  this.mensa={"id_ticket":id,'id_remitente':form.value.id_usuario,'mensaje':form.value.descripcion};
                  const men=this.mensa;
              
                     this.serviceMensaje.create(men,val[1],val[2],val[3]).subscribe(responses =>{
                      //console.log(responses);
                        this.modalCtrl.dismiss(responses,'created')
                      });

             });
  
    });
}

closeModal(){
  this.modalCtrl.dismiss(null,'closed');
}
async subirFotos() {
  await this.uploadFirebase();
  //await this.uploadFirebaseDos();
}
async addPhoto(source: string) {
  if (source === 'camera') {
    console.log('camera');
    let cameraPhoto = await this.openCamera();
    this.image = 'data:image/jpg;base64,' + cameraPhoto;
  } else {
    console.log('library');
    const libraryImage = await this.openLibrary();
    this.image = 'data:image/jpg;base64,' + libraryImage;
  }
}
async openCamera() {
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    targetWidth: 1000,
    targetHeight: 1000,
    sourceType: this.camera.PictureSourceType.CAMERA
  };
  return await this.camera.getPicture(options);
}
async openLibrary() {
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    targetWidth: 1000,
    targetHeight: 1000,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  };
  return await this.camera.getPicture(options);
}
async uploadFirebase() {
  const loading = await this.loadingController.create();
  await loading.present();
  this.imagePath = new Date().getTime() + '.jpg';
  console.log(this.imagePath);
  this.upload = this.afSG.ref(this.imagePath).putString(this.image, 'data_url');
  this.upload.then(async () => {
    await loading.dismiss();
    const alert = await this.alertController.create({
      header: 'Listo',
      message: this.imagePath,
      // message: 'SE ENVIO CORRECTAMENTE!',
      buttons: ['OK']
    });
    await alert.present();
  });
}
async onSubmit(form: NgForm) {
  let automo = form.value as Images;
  await this.subirFotos().then(async val => {
    automo.foto_uno = this.imagePath;
    //automo.foto_dos = this.imagePathDos;
    await this.serviceQueja.createFoto(automo).subscribe(response => console.log(response));
  });
}


}
