import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface Departamentos {

  id?:string;
  nombre?:string;
  descripcion?:string;
  club?:string;
  estatus?:string;
  
  
}

@Injectable({
  providedIn: 'root'
})

export class DepartamentosService {
  //private url="http://localhost/ionic_2/api/departamentos.php"
  private url="https://privadaarboledas.net/app/app_ionic/api/departamentos.php"

  constructor( private http: HttpClient) {}

  getAll(bd_name: string,bd_user: string,bd_pwd: string){
    return this.http.get<[Departamentos]>(this.url+'?bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd);
  }

  get(id: string){
    return this.http.get<[Departamentos]>(this.url+'?id='+id);
  }

  create(id: Departamentos){
    return this.http.post(this.url, id);

  }

  update(id2: Departamentos, id: string){
    return this.http.put(this.url+'?id='+id,id2);

  }

  remove(id: string){
    return this.http.delete(this.url+'?id='+id);

  }

}


