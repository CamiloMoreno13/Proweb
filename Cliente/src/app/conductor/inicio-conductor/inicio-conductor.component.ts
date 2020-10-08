import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ConductorService } from '../services/conductor.service';
import { Conductor } from '../clases/conductor';
import { HorarioConductor } from '../clases/horario-conductor';

@Component({
  selector: 'app-inicio-conductor',
  templateUrl: './inicio-conductor.component.html',
  styleUrls: ['./inicio-conductor.component.css']
})
export class InicioConductorComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private conductorService: ConductorService
    ) { }

    conductores: Conductor[] = [];
    busesAsignados: string[] = [];

    ngOnInit() {
      this.findAll();
    }

    findAll() {
      this.route.paramMap
        .pipe(
          switchMap(params => this.conductorService.findAll()
        ))
        .subscribe(result => {
          console.log(result);
          this.conductores = result;
          this.conductores.forEach( conductor => {
            this.findBuses( conductor.id);
          }
          );
        });
    }

    findBuses( id: number) {
      this.route.paramMap
        .pipe(
          switchMap(params => this.conductorService.findHorariosById(id)
        ))
        .subscribe(result => {
          console.log(result);
          let resultado = '';
          result.forEach( horario => {
              resultado += horario.bus.placa + ' ';
            }
          );
          this.busesAsignados[id] = resultado;
        });
    }

    back() {
      this.router.navigate(['/inicio/menu-coordinador']);
}
    crear() {
      this.router.navigate(['/conductor/edit-conductor']);
    }
}
