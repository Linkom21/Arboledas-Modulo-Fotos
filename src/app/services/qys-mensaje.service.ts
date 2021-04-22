import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Mensaje{
  id:string;
  id_ticket: string;
  nombre : string;
  fecha:string;
  mensaje:string;
  archivo:string;
  estatus:string;

  }


@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  //private url="http://localhost/ionic_2/api/ticket_mensaje.php"
  private url="https://privadaarboledas.net/app/app_ionic/api/ticket_mensaje.php"

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<[Mensaje]>(this.url);
    }

    get(id:string){
      return this.http.get<[Mensaje]>(this.url + '?id=' + id);
    }

    getMensajes(id:string,bd_name: string,bd_user: string,bd_pwd: string){
      return this.http.get<[Mensaje]>(this.url + '?id_ticket=' + id+'&bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd);
    }

    create(men: Mensaje,bd_name: string,bd_user: string,bd_pwd: string){
      return this.http.post(this.url+'?bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd, men);
  
    }
}