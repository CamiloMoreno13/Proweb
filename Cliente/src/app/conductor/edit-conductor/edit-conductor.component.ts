import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ConductorService } from '../services/conductor.service';
import { Conductor } from '../clases/conductor';
import { HorarioConductor } from '../clases/horario-conductor';
import { HorarioConductorService } from '../services/horario-conductor.service';
import { Bus } from '../../bus/clases/bus';
import { HorarioBus } from '../../bus/clases/horario-bus';
import { BusService } from '../../bus/services/bus.service';

@Component({
  selector: 'app-edit-conductor',
  templateUrl: './edit-conductor.component.html',
  styleUrls: ['./edit-conductor.component.css']
})
export class EditConductorComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private conductorService: ConductorService,
              private horarioConductorService: HorarioConductorService,
              private busService: BusService
    ) { }

  conductor: Conductor = new Conductor(null, null, null, null, null);
  horarios: HorarioConductor[] = [];
  // tslint:disable-next-line: variable-name
  crear_eliminar = true;
  buses: Bus[] = [];
  texto = '';
  bus: Bus = new Bus(undefined, undefined, undefined);
  fecha: Date;
  respuestas = 0;

  ngOnInit() {

    this.findBuses();
    // tslint:disable-next-line: triple-equals
    if (this.route.snapshot.paramMap.has('id') == true) {
      this.findConductor();
      this.findHorario();
      this.texto = 'Guardar Cambios';
    } else {
      this.ocultar_eliminar();
      this.texto = 'Crear';
    }
  }

  addbus() {
    if (this.bus.id === -1 || this.bus.id === undefined) {
      alert ('Su seleccion no es correcta');
    } else {
      console.log(this.bus);
      if ( this.route.snapshot.paramMap.has('id') == true ){
        this.addHorario( new HorarioConductor(null, this.fecha, this.conductor, this.bus) );
      } else {
        this.horarios.push( new HorarioConductor(null, this.fecha, this.conductor, this.bus) );
      }
    }
  }

  delbus() {
    console.log(this.bus);
    if (this.conductor.id === -100 || this.bus === undefined) {
      console.log(this.bus);
      } else {
        for (let i = 0; i < this.horarios.length; i++) {
          if (this.horarios[i].bus.id === this.bus.id) {
            if (this.route.snapshot.paramMap.has('id') == true){
              this.route.paramMap
              .pipe(
                switchMap(params =>  this.conductorService.deleteHorario( this.conductor.id, this.horarios[i].id )
              ))
              .subscribe(result => {
                this.horarios.splice(i, 1);
              });
            } else {
              this.horarios.splice(i, 1);
            }
            break;
          }
        }
      }
  }
  
  crear_actualizar() {
    // tslint:disable-next-line: triple-equals
    if (this.route.snapshot.paramMap.has('id') == true) {
      this.updateConductor(this.conductor);
    } else {
      this.createConductor(this.conductor);
    }
  }
  ocultar_eliminar() {
    this.crear_eliminar = false;
  }

  findConductor() {
    this.route.paramMap
      .pipe(
        switchMap(params => this.conductorService.findById(+params.get('id'))
      ))
      .subscribe(result => {
        console.log(result);
        this.conductor = result;
      });
  }

  createConductor(conductor: Conductor) {
    this.route.paramMap
      .pipe(
        switchMap(params => this.conductorService.create(conductor)
      ))
      .subscribe(result => {
        console.log(result);
        this.horarios.forEach(horario => {
          horario.conductor = result;
          this.addHorario( horario );
        });
      });
  }

  deleteConductor() {
    let id:number = +this.route.snapshot.paramMap.get('id');
    this.route.paramMap
      .pipe(
        switchMap(params => this.conductorService.deleteElement(id)
      ))
      .subscribe(result => {
        console.log(result);
        this.back();
      });
  }

  updateConductor( conductor: Conductor) {
    this.route.paramMap
      .pipe(
        switchMap(params => this.conductorService.update(conductor)
      ))
      .subscribe(result => {
        console.log(result);
        this.back();
      });
  }

  addHorario( horario: HorarioConductor) {
    
    this.route.paramMap
      .pipe(
        switchMap(params => this.horarioConductorService.create(horario)
      ))
      .subscribe(result => {
        console.log(result);
        if ( this.route.snapshot.paramMap.has('id') == false ){
          this.respuestas++;
          if( this.respuestas == this.horarios.length ){
            this.back();
          }
        } else {
          this.horarios.push( horario );
        }
      });
  }

  findHorario() {
    this.route.paramMap
      .pipe(
        switchMap(params => this.conductorService.findHorariosById(+params.get('id'))
      ))
      .subscribe(result => {
        console.log(result);
        this.horarios = result;
      });
  }

  back() {
    this.router.navigate(['/conductor/inicio-conductor']);
  }

  findBuses() {
    this.route.paramMap
      .pipe(switchMap(params => this.busService.findAll()))
      .subscribe(result => {
        console.log(result);
        this.buses = result;
      });
  }
}

