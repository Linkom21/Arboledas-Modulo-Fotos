import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

export interface Quejas{
id_residencial: string;
id_usuario:string;
id_departamento:string;

titulo:string;
publico:string;
descripcion:string;
creacion:string;
id:string;
}
export interface Images{
  id?: string;
  foto_uno?: string;
 // foto_dos?: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuejasService {

  //private url="http://localhost/ionic_2/api/qys.php"
  private url="https://privadaarboledas.net/app/app_ionic/api/qys.php"
  private urlImagenes = "http://localhost/ionic_valet/api/storage.php?"


  constructor(private http: HttpClient) { }

  getQuejasPrivadasAbiertas(id_residencial:string,id_usuario:string,bd_name: string,bd_user: string,bd_pwd: string){
    return this.http.get<[Quejas]>(this.url+'?id_residencial='+id_residencial+'&id_usuario='+id_usuario+'&publicas=1&estatus=1&bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd);
    }

 getQuejasPrivadasCerradas(id_residencial:string,id_usuario:string,bd_name: string,bd_user: string,bd_pwd: string){
      return this.http.get<[Quejas]>(this.url+'?id_residencial='+id_residencial+'&id_usuario='+id_usuario+'&publicas=1&estatus=0&bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd);
      }


 getQuejasCerradasAbiertas(id_residencial:string,bd_name: string,bd_user: string,bd_pwd: string){
        return this.http.get<[Quejas]>(this.url+'?id_residencial='+id_residencial+'&generales=1&estatus=1&bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd);
        }    
    
getQuejasPublicasCerradas(id_residencial:string,bd_name: string,bd_user: string,bd_pwd: string){
          return this.http.get<[Quejas]>(this.url+'?id_residencial='+id_residencial+'&generales=1&estatus=0&bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd);
          }

          
    
  getAll(){
  return this.http.get<[Quejas]>(this.url);
  }


  get(id:string,bd_name: string,bd_user: string,bd_pwd: string){
    return this.http.get<[Quejas]>(this.url + '?id=' + id+'&bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd);
  }

  create(quejas: Quejas,bd_name: string,bd_user: string,bd_pwd: string){
    return this.http.post(this.url+'?bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd, quejas);

  }
  createFoto(images: Images){
    // return this.http.post(this.url+'?bd_name='+bd_name+'&bd_user='+bd_user+'&bd_pwd='+bd_pwd, images);
    return this.http.post(this.urlImagenes, images);
 
   }
}