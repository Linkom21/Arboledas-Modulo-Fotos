import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


export interface Registro {

  id_residencial?:string;
  nombre?:string;
  apellido_paterno?:string;
  apellido_materno?:string;
  correo?:string;
  up?:string;
}

@Injectable({
  providedIn: 'root'
})

export class RegistroService {
 // private url="http://localhost/ionic_2/api/registro_app.php"
  private url="https://privadaarboledas.net/app/app_ionic/api/registro_app.php"

  constructor( private http: HttpClient) {}

  
  
  

  create(registro: Registro,bd_name: string,bd_user: string,bd_pwd: string){
    return this.http.post(this.url+'?bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd, registro);

  }

  
 

}



