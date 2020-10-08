import { Component, OnInit } from '@angular/core';
import { BusService } from '../services/bus.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Bus } from '../clases/bus';
import { HorarioBus } from '../clases/horario-bus';
import { HorarioBusService } from '../services/horario-bus.service';
import { Conductor } from '../../conductor/clases/conductor';
import { RutaService } from '../../ruta/services/ruta/ruta.service';
import { Ruta } from '../../ruta/clases/ruta/ruta';
import { Button } from 'protractor';
import { EstacionRutas } from '../../ruta/clases/ruta/estacion-rutas';

@Component({
  selector: 'app-edit-bus',
  templateUrl: './edit-bus.component.html',
  styleUrls: ['./edit-bus.component.css']
})
export class EditBusComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private busService: BusService,
              private horarioBusService: HorarioBusService,
              private rutaService: RutaService) { }
  
  // funciones usadas para cuando se carga.
  bus: Bus = new Bus(null, null, null);
  conductor: Conductor = new Conductor(null, null, null, null, null);
  horarioBus: HorarioBus[] = [];
  estaciones: string[] = [];
  // variables usadas cuando se tiene un id

  // variables usadas cuando se va a crear
  rutas: Ruta[] = []; // muestra las todas las rutas
  fecha: Date;
  // tslint:disable-next-line: variable-name
  rutas_id: Ruta[] = [];
  // tslint:disable-next-line: variable-name
  horario_add: HorarioBus;
  // variables usadas para cambios visuales
  // tslint:disable-next-line: variable-name
  crear_eliminar = true;
  texto = '';
  ruta: Ruta = new Ruta( undefined, undefined);
  numero: number;
  respuestas = 0;

  ngOnInit() {
    this.findRutas();
    if (this.route.snapshot.paramMap.has('id') === true) {
      this.findBus();
      this.findHorario();
      this.texto = 'Guardar Cambios';
    } else {
      this.ocultar_eliminar();
      this.texto = 'Crear';
    }
  }

  addruta() {
    if (this.ruta.id === -1 || this.ruta === undefined) {
      alert ('Su seleccion no es correcta');
    } else {
      const horario: HorarioBus = new HorarioBus(null, this.fecha, this.ruta, this.bus); 
      this.actualizarEstaciones();
      if ( this.route.snapshot.paramMap.has('id') == true ){
        this.addHorario( horario );
      } else {
        this.horarioBus.push( horario );
      }
      console.log(this.ruta);
    }
  }

  delruta() {
    if (this.ruta.id === -100 || this.bus === undefined) {
    console.log(this.ruta.id);
    } else {

      
      for (let i = 0; i < this.horarioBus.length; i++) {

        if (this.horarioBus[i].ruta.id === this.ruta.id) {
          if ( this.route.snapshot.paramMap.has('id') == true ){
          
              this.route.paramMap
              .pipe(
              switchMap(params =>  this.busService.deleteHorario( this.bus.id, this.horarioBus[i].id )
              ))
              .subscribe(result => {
              this.horarioBus.splice(i, 1);
              console.log(i);
            });
          }else{
            this.horarioBus.splice(i,1);
          }
          break;
        }
      }
    }
  }

  
  ocultar_eliminar() {
    this.crear_eliminar = false;
  }

  crear_actualizar() {
    if (this.route.snapshot.paramMap.has('id') === true) {
      this.updateBus(this.bus);
    } else {
      this.createBus(this.bus);
    }
  }

  findBus() {
    this.route.paramMap
      .pipe(
        switchMap(params => this.busService.findById(+params.get('id'))
      ))
      .subscribe(result => {
        console.log(result);
        this.bus = result;
      });
  }

  createBus(bus: Bus) {
    this.route.paramMap
      .pipe(
        switchMap(params => this.busService.create(bus)
      ))
      .subscribe(result => {
        console.log(result);
        this.horarioBus.forEach(horario => {
          horario.bus.id = result.id;
          this.addHorario( horario );
        });
      });
  }

  deleteBus() {
    this.route.paramMap
      .pipe(
        switchMap(params => this.busService.deleteElement(+params.get('id'))
      ))
      .subscribe(result => {
        console.log(result);
        this.back();
      }, error => {
        console.error(error);
        alert ( 'Error: Este bus tiene asignado un conductor, no se puede eliminar'); 
      });
  }

  updateBus( bus: Bus) {
    this.route.paramMap
      .pipe(
        switchMap(params => this.busService.update(bus)
      ))
      .subscribe(result => {
        console.log(result);
        this.back();
      });
  }

  addHorario( horario: HorarioBus) {
    this.route.paramMap
      .pipe(
        switchMap(params => this.horarioBusService.create(horario)
      ))
      .subscribe(result => {
        
        if ( this.route.snapshot.paramMap.has('id') == false ){
          this.respuestas++;
          if( this.respuestas == this.horarioBus.length ){
            this.back();
          }
        } else {
          this.horarioBus.push( horario );
        }
      });
  }

  findHorario() {
    this.route.paramMap
      .pipe(
        switchMap(params => this.busService.findHorariosById(+params.get('id'))
      ))
      .subscribe(result => {
        console.log(result);
        this.horarioBus = result;
        this.actualizarEstaciones();
      });
  }


  back() {
    this.router.navigate(['/bus/inicio-bus']);
  }

  findRutas() {
    this.route.paramMap
      .pipe(switchMap(params => this.rutaService.findAll()))
      .subscribe(result => {
        console.log(result);
        this.rutas = result;
      });
  }

  actualizarEstaciones() {
    this.horarioBus.forEach( horario => {
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
}
