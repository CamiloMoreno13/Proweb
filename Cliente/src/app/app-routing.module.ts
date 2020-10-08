import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioConductorComponent } from './conductor/inicio-conductor/inicio-conductor.component';
import { InicioBusComponent } from './bus/inicio-bus/inicio-bus.component';
import { InicioRutaComponent } from './ruta/inicio-ruta/inicio-ruta.component';
import { LoginComponent } from './inicio/login/login.component';
import { EditRutaComponent } from './ruta/edit-ruta/edit-ruta.component';
import { EditBusComponent } from './bus/edit-bus/edit-bus.component';
import { EditConductorComponent } from './conductor/edit-conductor/edit-conductor.component';
import { MenuCoordinadorComponent } from './inicio/menu-coordinador/menu-coordinador.component';
import { UserComponent } from './ruta/user/user.component';


const routes: Routes = [

  { path: 'conductor/inicio-conductor', component: InicioConductorComponent },
  { path: 'bus/inicio-bus', component: InicioBusComponent },
  { path: 'ruta/inicio-ruta', component: InicioRutaComponent },
  { path: 'ruta/edit-ruta', component: EditRutaComponent },
  { path: 'ruta/edit-ruta/:id', component: EditRutaComponent },
  { path: 'bus/edit-bus', component: EditBusComponent },
  { path: 'bus/edit-bus/:id', component: EditBusComponent },
  { path: 'conductor/edit-conductor/:id', component: EditConductorComponent },
  { path: 'conductor/edit-conductor', component: EditConductorComponent },
  { path: 'inicio/login', component: LoginComponent },
  { path: 'inicio/menu-coordinador', component: MenuCoordinadorComponent },
  { path: 'inicio/user', component: UserComponent },
  { path: '', pathMatch: 'full', redirectTo: 'inicio/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
