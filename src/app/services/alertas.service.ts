import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface Alertas {

  id?:string;
  id_residencial?:string;
  id_usuario?:string;
  titulo?:string;
  
  
}

@Injectable({
  providedIn: 'root'
})

export class AlertasService {
 //private url="http://localhost/ionic_2/api/alertas.php"
  private url="https://privadaarboledas.net/app/app_ionic/api/alertas.php"

  constructor( private http: HttpClient) {}

  
  getAll(){
    return this.http.get<[Alertas]>(this.url);
  }

  getAlertasActivas(id_residencial: string, id_usuario:string,bd_name: string,bd_user: string,bd_pwd: string){
    return this.http.get<[Alertas]>(this.url+'?id_residencial='+id_residencial+'&id_usuario='+id_usuario+'&estatus=1'+'&bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd);
  }


  getAlertasInactivas(id_residencial: string, id_usuario:string,bd_name: string,bd_user: string,bd_pwd: string){
    return this.http.get<[Alertas]>(this.url+'?id_residencial='+id_residencial+'&id_usuario='+id_usuario+'&estatus=0'+'&bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd);
  }

  get(id: string,bd_name: string,bd_user: string,bd_pwd: string){
    return this.http.get<[Alertas]>(this.url+'?id='+id+'&bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd);
  }

  create(alerta: Alertas ,bd_name: string,bd_user: string,bd_pwd: string){
    return this.http.post(this.url+'?bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd, alerta);

  }

  update(alerta: Alertas, id: string){
    return this.http.put(this.url+'?id='+id,alerta);

  }

  remove(id: string){
    return this.http.delete(this.url+'?id='+id);

  }

}


