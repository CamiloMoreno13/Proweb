import { Component, OnInit } from '@angular/core';
import { RutaService } from '../services/ruta/ruta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HorarioRutaService } from '../services/ruta/horario-ruta.service';
import { HorarioRuta } from '../clases/ruta/horario-ruta';
import { Ruta } from '../clases/ruta/ruta';

@Component({
  selector: 'app-inicio-ruta',
  templateUrl: './inicio-ruta.component.html',
  styleUrls: ['./inicio-ruta.component.css']
})
export class InicioRutaComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rutaService: RutaService
  ) {}

  estaciones: string[] = [];
  horarioRutas: HorarioRuta[] = [];

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.route.paramMap
      .pipe(switchMap(params => this.rutaService.findAll()))
      .subscribe(result => {
        console.log(result);
        result.forEach( ruta => {
          let estaciones = '';
          this.findHorario( ruta.id );
          /*ruta.estaciones.forEach( estacion => {
            estaciones+= estacion.nombre + ' ';
          });
          this.estaciones[ruta.id] = estaciones;*/
        });
      });
  }

  findHorario(id: number) {
    this.route.paramMap
      .pipe(
        switchMap(params => this.rutaService.findHorariosById(id)
      ))
      .subscribe(result => {
        console.log(result);
        this.horarioRutas = this.horarioRutas.concat( result );
        this.actualizarEstaciones();
      });
  }
  crear() {
    this.router.navigate(['/ruta/edit-ruta']);
  }

  actualizarEstaciones() {

    this.horarioRutas.forEach( horario => {
      this.route.paramMap
      .pipe(
      switchMap(params => this.rutaService.findEstacionesById( horario.ruta.id ))
      ).subscribe( result => {
        let estacionString = '';
        result.forEach(estacionRuta => {
          estacionString += estacionRuta.estacion.nombre + ' ';
        });
        this.estaciones[ horario.ruta.id ] = estacionString;
      });
    });
  }

  logout() {
    this.rutaService.logout().subscribe(data => {
        this.router.navigate(['/inicio/login']);
      }, error => {
        console.error(error);
      });
  }

}
