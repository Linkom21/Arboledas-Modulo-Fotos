import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


export interface Pin {

  id?:string;
  nombre?:string;
  dominio_residencial?:string;
  pin?:string;
  
}

@Injectable({
  providedIn: 'root'
})

export class PinService {
  //private url="http://localhost/ionic_2/api/residenciales.php"
  private url="https://privadaarboledas.net/app/app_ionic/api/residenciales.php"

  constructor( private http: HttpClient) {}

  pin(pin: string){
    return this.http.get<[Pin]>(this.url+'?pin='+pin);

  }

  getAll(){
    return this.http.get<[Pin]>(this.url);
  }

  get(id: string){
    return this.http.get<[Pin]>(this.url+'?id='+id);
  }

  getAlertas(id: string){
    return this.http.get<[Pin]>(this.url+'?id_alertas='+id);
  }

  create(usuario: Pin){
    return this.http.post(this.url, usuario);

  }

  update(usuario: Pin, id: string){
    return this.http.put(this.url+'?id='+id,usuario);

  }

  remove(id: string){
    return this.http.delete(this.url+'?id='+id);

  }

}


