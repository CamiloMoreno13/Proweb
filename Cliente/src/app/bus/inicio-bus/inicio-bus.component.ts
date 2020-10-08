import { Component, OnInit } from '@angular/core';
import { BusService } from '../services/bus.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Bus } from '../clases/bus';
import { HorarioBus } from '../clases/horario-bus';
import { HorarioBusService } from '../services/horario-bus.service';

@Component({
  selector: 'app-inicio-bus',
  templateUrl: './inicio-bus.component.html',
  styleUrls: ['./inicio-bus.component.css']
})
export class InicioBusComponent implements OnInit {

  buses: Bus[] = [];
  horarioBus: HorarioBus[] = [];
  rutasBus: string[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private horarioBusService: HorarioBusService,
              private busService: BusService
  ) { }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.route.paramMap
      .pipe(
        switchMap(params => this.busService.findAll()
      ))
      .subscribe(result => {
        console.log(result);
        result.forEach( bus => {
          this.findRutas(bus.id);
        });
        this.buses = result;
        console.log(this.rutasBus);
      });
  }

  findRutas(id: number) {
    this.route.paramMap
      .pipe(
        switchMap(params => this.busService.findHorariosById(id)
      ))
      .subscribe(result => {
        console.log(result);
        let rutas = '';
        result.forEach( horario => {
          rutas += horario.ruta.codigo + ' ';
        });
        this.rutasBus[id] = rutas;
      });
  }
  goTo() {
    this.router.navigate(['/bus/edit-bus']);
  }
  back() {
    this.router.navigate(['/inicio/menu-coordinador']);
  }
}
