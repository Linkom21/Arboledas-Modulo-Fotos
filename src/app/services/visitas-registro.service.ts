import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


export interface VisitasReg {

  id?:string;
  id_visita?:string;
  fecha_entrada?:string;
  fecha_salida?:string;
}

@Injectable({
  providedIn: 'root'
})

export class VisitasRegService {
  //private url="http://localhost/ionic_2/api/visita_registro.php"
  private url="https://privadaarboledas.net/app/app_ionic/api/visita_registro.php"

  constructor( private http: HttpClient) {}

  
  
  get(id: string,bd_name: string,bd_user: string,bd_pwd: string){
    return this.http.get<[VisitasReg]>(this.url+'?id_vi='+id+'&bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd);
  }

  create(visita_registro: VisitasReg,bd_name: string,bd_user: string,bd_pwd: string){
    return this.http.post(this.url+'?bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd, visita_registro);

  }

  
 

}


