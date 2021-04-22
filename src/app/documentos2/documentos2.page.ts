import { Component, OnInit ,Renderer2, ViewChild} from '@angular/core';
import { CatDocuService,CatDocu } from '../services/cat-docu.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-documentos2',
  templateUrl: './documentos2.page.html',
  styleUrls: ['./documentos2.page.scss'],
})
export class Documentos2Page implements OnInit {
  catdocu: CatDocu[];
  
  constructor(private CatDocuServices: CatDocuService,
              private storage: Storage) { }


              async ngOnInit() {

                this.storage.get('datos').then(async (val)=>{
            
                    await this.CatDocuServices.getAll(val[1],val[2],val[3]).subscribe(response=>{
                      this.catdocu=(response);
                  
                    })
            
                  });    
              }
            }
