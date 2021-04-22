import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


export interface Usuarios {

  id?:string;
  usuario?:string;
  contrasenia?:string;
  id_residencial?:string;
  id_usuario?:string;
  
}



@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  //private url="http://localhost/ionic_2/api/usuarios.php"
  private url="https://privadaarboledas.net/app/app_ionic/api/usuarios.php"
  constructor( private http: HttpClient) {}

  login(usuario: string, contrasenia: string, id_residencial:string, bd_name: string,bd_user: string,bd_pwd: string){
    return this.http.get<[Usuarios]>(this.url+'?usuario='+usuario+'&contrasenia='+contrasenia+'&id_residencial='+id_residencial+'&bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd);

  }

  getAll(){
    return this.http.get<[Usuarios]>(this.url);
  }

  correo(correo_electronico:string,id_residencial: string,bd_name: string,bd_user: string,bd_pwd: string){
    return this.http.get<[Usuarios]>(this.url+'?correo_electronico='+correo_electronico+'&id_residencial='+id_residencial+'&bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd);
  }

  
  get(id: string,bd_name: string,bd_user: string,bd_pwd: string){
    return this.http.get<[Usuarios]>(this.url+'?id='+id+'&bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd);
  }

  getAlertas(id: string,bd_name: string,bd_user: string,bd_pwd: string){
    return this.http.get<[Usuarios]>(this.url+'?id_alertas='+id+'&bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd);
  }

  create(usuario: Usuarios){
    return this.http.post(this.url, usuario);

  }

  update(usuario: Usuarios, id: string){
    return this.http.put(this.url+'?id='+id,usuario);
  }

  //Para editar el usuario de MySQL y agregarle el UID
  updateToken(usuario: Usuarios, id: string, bd_name: string, bd_user: string,bd_pwd: string, tokenUID: string,){
    return this.http.put(this.url+'?id='+id+'&token='+tokenUID+'&bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd,usuario);  
  }

  updateContra(usuario: Usuarios, id: string,bd_name: string,bd_user: string,bd_pwd: string){
    return this.http.put(this.url+'?id='+id+'&contrasenia=1&bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd,usuario);

  }

  remove(id: string){
    return this.http.delete(this.url+'?id='+id);

  }

}


