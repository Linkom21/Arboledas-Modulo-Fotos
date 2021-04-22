import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface CatDocu {

  id?:string;
  nombre?:string;
  descripcion?:string;
  club?:string;
  estatus?:string;
  
  
}

@Injectable({
  providedIn: 'root'
})

export class CatDocuService {
  //private url="http://localhost/ionic_2/api/categoria_documentos.php"
  private url="https://privadaarboledas.net/app/app_ionic/api/categoria_documentos.php"

  constructor( private http: HttpClient) {}

  
  getAll(bd_name: string,bd_user: string,bd_pwd: string){
    return this.http.get<[CatDocu]>(this.url+'?bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd);
  }

  get(id: string,bd_name: string,bd_user: string,bd_pwd: string){
    return this.http.get<[CatDocu]>(this.url+'?id='+id+'&bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd);
  }

  create(id: CatDocu){
    return this.http.post(this.url, id);

  }

  update(id2: CatDocu, id: string){
    return this.http.put(this.url+'?id='+id,id2);

  }

  remove(id: string){
    return this.http.delete(this.url+'?id='+id);

  }

}


