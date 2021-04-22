import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface Documentos {

 id?:string;
 id_residencial?:string;
 id_categoria_documento?:string;
 id_grupo_documento?:string;
 titulo?:string;
 descripcion?:string;
 fecha_actualizacion?:string;
 archivo?:string;
 club?:string;
 estatus?:string;
  
}

@Injectable({
  providedIn: 'root'
})

export class DocumentosService {
  //private url="http://localhost/ionic_2/api/documentos.php"
  private url="https://privadaarboledas.net/app/app_ionic/api/documentos.php"

  constructor( private http: HttpClient) {}

  traerDocumentos(id_residencial: string, id_usuario: string, id_categoria_documento: string,bd_name: string,bd_user: string,bd_pwd: string){
    return this.http.get<[Documentos]>(this.url+'?id_residencial='+id_residencial+'&id_usuario='+id_usuario+'&generales=1&id_categoria_documento='+id_categoria_documento+'&bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd);
  }

  traerDocumentos2(id_residencial: string, id_usuario: string,id_categoria_documento: string,bd_name: string,bd_user: string,bd_pwd: string){
    return this.http.get<[Documentos]>(this.url+'?id_residencial='+id_residencial+'&id_usuario='+id_usuario+'&personales=1&id_categoria_documento='+id_categoria_documento+'&bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd);
  }

  getAll(){
    return this.http.get<[Documentos]>(this.url);
  }

  get(id: string){
    return this.http.get<[Documentos]>(this.url+'?id='+id);
  }

  create(student: Documentos){
    return this.http.post(this.url, student);

  }

  update(student: Documentos, id: string){
    return this.http.put(this.url+'?id='+id,student);

  }

  remove(id: string){
    return this.http.delete(this.url+'?id='+id);

  }

}


