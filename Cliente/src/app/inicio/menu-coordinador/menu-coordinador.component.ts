import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InicioBusComponent } from '../../bus/inicio-bus/inicio-bus.component';
import { InicioService } from '../services/inicio.service';

@Component({
  selector: 'app-menu-coordinador',
  templateUrl: './menu-coordinador.component.html',
  styleUrls: ['./menu-coordinador.component.css']
})
export class MenuCoordinadorComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private inicioService: InicioService) { }

  ngOnInit() {

  }
  goConductor(){
    this.router.navigate(['/conductor/inicio-conductor']);
  }
  goBus(){
    this.router.navigate(['/bus/inicio-bus']);
  }

  logout() {
    this.inicioService.logout().subscribe(data => {
      this.router.navigate(['/inicio/login']);
      }, error => {
        console.error(error);
      });
  }
}
