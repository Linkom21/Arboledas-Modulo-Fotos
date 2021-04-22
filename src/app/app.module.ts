import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { firebaseConfig} from '../environments/environment';
import { AngularFireModule} from '@angular/fire';
import { AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import { DtlnoticiaPage } from './dtlnoticia/dtlnoticia.page';
import { DtldocumentoPage } from './dtldocumento/dtldocumento.page';
import { DtldocumentoPersonalesPage } from './dtldocumento-personales/dtldocumento-personales.page';
import { AlertaNuevaPage } from './alerta-nueva/alerta-nueva.page';
import { QysNuevaPage } from './qys-nueva/qys-nueva.page';
import { QysNuevoMensajePage } from './qys-nuevo-mensaje/qys-nuevo-mensaje.page';
import { VisitasNuevoPage } from './visitas-nuevo/visitas-nuevo.page';
import { DtlVisitaPage } from './dtl-visita/dtl-visita.page';
import { IonicStorageModule } from '@ionic/storage';
import { ContrasenaPage } from './contrasena/contrasena.page';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { Camera } from '@ionic-native/camera/ngx'

@NgModule({
  declarations: [AppComponent,DtlnoticiaPage,DtldocumentoPage,DtldocumentoPersonalesPage,AlertaNuevaPage,QysNuevaPage,QysNuevoMensajePage,VisitasNuevoPage,DtlVisitaPage,ContrasenaPage],
  entryComponents: [DtlnoticiaPage,DtldocumentoPage,DtldocumentoPersonalesPage,AlertaNuevaPage,QysNuevaPage,QysNuevoMensajePage,VisitasNuevoPage,DtlVisitaPage,ContrasenaPage],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot(),
    ReactiveFormsModule

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
