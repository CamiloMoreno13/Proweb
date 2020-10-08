import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioConductorComponent } from './conductor/inicio-conductor/inicio-conductor.component';
import { InicioRutaComponent } from './ruta/inicio-ruta/inicio-ruta.component';
import { InicioBusComponent } from './bus/inicio-bus/inicio-bus.component';
import { LoginComponent } from './inicio/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuCoordinadorComponent } from './inicio/menu-coordinador/menu-coordinador.component';
import { EditConductorComponent } from './conductor/edit-conductor/edit-conductor.component';
import { EditBusComponent } from './bus/edit-bus/edit-bus.component';
import { EditRutaComponent } from './ruta/edit-ruta/edit-ruta.component';
import { FormsModule} from '@angular/forms';
import { UserComponent } from './ruta/user/user.component';
@NgModule({
  declarations: [
    AppComponent,
    InicioConductorComponent,
    InicioRutaComponent,
    InicioBusComponent,
    LoginComponent,
    MenuCoordinadorComponent,
    EditConductorComponent,
    EditBusComponent,
    EditRutaComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
