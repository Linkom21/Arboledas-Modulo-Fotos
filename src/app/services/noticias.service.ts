import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface Noticias {

  id?:string;
  id_residencial?:string;
  id_grupo?:string;
  titulo?:string;
  fecha?:string;
  informacion?:string;
  fecha_inicio?:string;
  fecha_vigencia?:string;
  enlace?:string;
  tipo?:string;
  archivo?:string;
  club?:string;
  estatus?:string;
  
}

@Injectable({
  providedIn: 'root'
})

export class NoticiasService {
 // private url="http://localhost/ionic_2/api/noticias.php"
    private url="https://privadaarboledas.net/app/app_ionic/api/noticias.php"

  constructor( private http: HttpClient) {}

  traerNoticias(id_residencial: string, id_usuario: string,bd_name: string,bd_user: string,bd_pwd: string){
    return this.http.get<[Noticias]>(this.url+'?id_residencial='+id_residencial+'&id_usuario='+id_usuario+'&bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd);
  }
  
  getAll(){
    return this.http.get<[Noticias]>(this.url);
  }

  get(id: string){
    return this.http.get<[Noticias]>(this.url+'?id='+id);
  }

  create(student: Noticias){
    return this.http.post(this.url, student);

  }

  update(student: Noticias, id: string){
    return this.http.put(this.url+'?id='+id,student);

  }

  remove(id: string){
    return this.http.delete(this.url+'?id='+id);

  }

}


