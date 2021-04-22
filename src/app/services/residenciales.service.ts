import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

export interface Resi{
id_pin: string;
id:string;
nombre:string;
direccion:string;
telefono:string;
correo_electronico:string;
logotipo:string;
representante:string;
estatus:string;
}

@Injectable({
  providedIn: 'root'
})
export class ResidencialesService {

  //private url="http://localhost/ionic_2/api/pin_residencial.php"
  private url="https://privadaarboledas.net/app/app_ionic/api/pin_residencial.php"

  constructor(private http: HttpClient) { }

  get(id_pin:string,bd_name: string,bd_user: string,bd_pwd: string){
    return this.http.get<[Resi]>(this.url+'?pin='+id_pin+'&estatus=1&bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd);
    }

}
