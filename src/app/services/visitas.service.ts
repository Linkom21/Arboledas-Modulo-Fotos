import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


export interface Visitas {

  id?:string;
  usuario?:string;
  contrasenia?:string;
  id_residencial?:string;
  id_usuario?:string;
  nombre_visita?:string;
}

@Injectable({
  providedIn: 'root'
})

export class VisitasService {
  //private url="http://localhost/ionic_2/api/visitas.php"
  private url="https://privadaarboledas.net/app/app_ionic/api/visitas.php"

  constructor( private http: HttpClient) {}

  traerVisita(id_residencial: string, id_usuario: string,bd_name: string,bd_user: string,bd_pwd: string){
    return this.http.get<[Visitas]>(this.url+'?id_residencial='+id_residencial+'&id_usuario='+id_usuario+'&bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd);

  }
  getAll(){
    return this.http.get<[Visitas]>(this.url);
  }

  get(id: string,id_residencial: string,bd_name: string,bd_user: string,bd_pwd: string){
    return this.http.get<[Visitas]>(this.url+'?id='+id+'&id_residencial='+id_residencial+'&bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd);
  }



  create(visita: Visitas,bd_name: string,bd_user: string,bd_pwd: string){
    return this.http.post(this.url+'?bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd, visita);

  }

  update(visita: Visitas, id: string){
    return this.http.put(this.url+'?id='+id,visita);

  }

  remove(id: string){
    return this.http.delete(this.url+'?id='+id);

  }

}


