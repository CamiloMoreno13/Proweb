import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { RutaService } from '../services/ruta/ruta.service';
import { Ruta } from '../clases/ruta/ruta';
import { HorarioRuta } from '../clases/ruta/horario-ruta';
import { HorarioConductorService } from '../../conductor/services/horario-conductor.service';
import { HorarioRutaService } from '../services/ruta/horario-ruta.service';
import { Estacion } from '../clases/estacion/estacion';
import { EstacionService } from '../services/estacion/estacion.service';
import { getLocaleDateTimeFormat, Time } from '@angular/common';
import { EstacionRutas } from '../clases/ruta/estacion-rutas';

@Component({
  selector: 'app-edit-ruta',
  templateUrl: './edit-ruta.component.html',
  styleUrls: ['./edit-ruta.component.css']
})
export class EditRutaComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rutaService: RutaService,
              private horarioRutaService: HorarioRutaService,
              private estacionService: EstacionService
  ) { }
  ruta: Ruta = new Ruta(null, null);
  horarios: HorarioRuta[] = [];
  estacionRutas: EstacionRutas[] = [];
  estaciones: Estacion[] = [];
  // tslint:disable-next-line: variable-name
  crear_actualizar = true;
  texto = '';
  respuestas = 0;
  fechaInicio: Date = new Date();
  fechaFin: Date;
  estacion: Estacion;
  horario: HorarioRuta;

  ngOnInit() {
    // tslint:disable-next-line: triple-equals
    this.findEstaciones();
    if (this.route.snapshot.paramMap.has('id') == true) {
      this.findRuta();
      this.findHorario();
      this.findEstacionesById();
      this.texto = 'Guardar Cambios';
    } else {
      this.ocultar_eliminar();
      this.texto = 'Crear';
    }
  }
  ocultar_eliminar() {
    this.crear_actualizar = false;
  }
  crear_actu() {
  // tslint:disable-next-line: triple-equals
  if (this.route.snapshot.paramMap.has('id') == true) {
    this.updateRuta(this.ruta);
  } else {
    this.createRuta(this.ruta);
  }
 }

  eliminar() {
    this.route.paramMap
    .pipe(
      switchMap(params => this.rutaService.findHorariosById(+params.get('id'))
    ))
    .subscribe(result => {
      console.log(result);
      const valor = this.route.snapshot.paramMap.get('id');
      // tslint:disable-next-line: radix
      const id: number = parseInt(valor);
      this.deleteRuta(id);
  });
  }

  addHorarioRuta() {

      const horario: HorarioRuta = new HorarioRuta(null, this.fechaInicio, this.fechaFin ,this.ruta); 

      if ( this.route.snapshot.paramMap.has('id') == true ){
        this.addHorario( horario );
      } else {
        this.horarios.push( horario );
      }
    
  }

  findRuta() {
    this.route.paramMap
      .pipe(
        switchMap(params => this.rutaService.findById(+params.get('id'))
        ))
      .subscribe(result => {
        console.log(result);
        this.ruta = result;
      });
  }

  createRuta(ruta: Ruta) {
    this.route.paramMap
      .pipe(
        switchMap(params => this.rutaService.create(ruta)
        ))
      .subscribe(result => {
        console.log(result);
        this.horarios.forEach(horario => {
          horario.ruta.id = result.id;
          this.addHorario( horario );
        });
      });
  }

  addEstacion() {

      if ( this.route.snapshot.paramMap.has('id') == true ){
        this.createEstacionRuta( this.ruta.id, this.estacion.id);
      } else{
        this.estacionRutas.push( new EstacionRutas(null, this.ruta, this.estacion) );
      }
  }

  createEstacionRuta( rutaId, estacionId){
    this.route.paramMap
      .pipe(
        switchMap(params => this.rutaService.addEstacion( rutaId, estacionId)
        ))
      .subscribe(result => {

          // verificar si es el último dato a ingresar de una Nueva Ruta y volver al menu de inicio 
          if ( this.route.snapshot.paramMap.has('id') == false ){
            this.respuestas++;
            if( this.respuestas == this.estacionRutas.length + this.horarios.length)
            {
              this.back();
            }
          } else{
            this.estacionRutas.push( new EstacionRutas(
              null, result.ruta, result.estacion ) );
          }
        });
  }

  deleteRuta(id: number) {
    this.route.paramMap
      .pipe(
        switchMap(params => this.rutaService.deleteElement(id)
        ))
      .subscribe(result => {
        console.log(result);
        this.back();
      }, error => {
        console.error(error);
        alert ( 'Error: Esta ruta tiene asignada un bus, no se puede eliminar');
      });
  }

  updateRuta(ruta: Ruta) {
    this.route.paramMap
      .pipe(
        switchMap(params => this.rutaService.update(ruta)
        ))
      .subscribe(result => {
        console.log(result);
        this.back();
      });
  }

  addHorario( horario: HorarioRuta) {
    this.route.paramMap
      .pipe(
        switchMap(params => this.horarioRutaService.create(horario)
      ))
      .subscribe(result => {
        
        if ( this.route.snapshot.paramMap.has('id') == false ){
          this.respuestas++;
          if( this.respuestas == this.horarios.length){
            this.estacionRutas.forEach( rutaEstacion => {
              this.createEstacionRuta( this.ruta.id, rutaEstacion.estacion.id);
            });
          }
        } else {
          this.horarios.push( horario );
        }
      });
  }

  findHorario(){
    this.route.paramMap
      .pipe(
        switchMap(params => this.rutaService.findHorariosById(+params.get('id'))
      ))
      .subscribe(result => {
        console.log(result);
        this.horarios = result;
      });
  }
  back() {
    this.router.navigate(['/ruta/inicio-ruta']);
  }
  
  findEstaciones(){
      this.route.paramMap
      .pipe(switchMap(params => this.estacionService.findAll()))
      .subscribe(result => {
        console.log(result);
        this.estaciones = result;
      });
  }

  findEstacionesById(){
    this.route.paramMap
      .pipe(switchMap(params => this.rutaService.findEstacionesById(+params.get('id'))))
      .subscribe(result => {
        console.log(result);
        this.estacionRutas = result;
      });
    }

    
    delHorario(){

    console.log(this.horarios);
    if (this.ruta.id === -1 || this.horario === undefined) {
      console.log(this.horario);
      } else {
        for (let i = 0; i < this.horarios.length; i++) {
          if (this.horarios[i].id === this.horario.id) {

            if( this.route.snapshot.paramMap.has('id') == true){

                this.route.paramMap
                .pipe(
                  switchMap(params =>  this.rutaService.deleteHorario( this.ruta.id , this.horarios[i].id )
                ))
                .subscribe(result => {
                  this.horarios.splice(i, 1);
                  console.log(i);
                });
            }else{
              this.horarios.splice(i, 1);
            }
            break;
          }
        }
      }
    }

    delEstacion(){

      if (this.ruta.id === -100 || this.estacion === undefined) {
        console.log(this.estacion);
        } else {

          if( this.route.snapshot.paramMap.has('id') == true){
                console.log( this.estacion.id );
                for (let i = 0; i < this.estacionRutas.length; i++) {
                  if (this.estacionRutas[i].estacion.id === this.estacion.id) {
                    this.route.paramMap
                    .pipe(
                      switchMap(params =>  this.rutaService.deleteEstacion( this.ruta.id , this.estacionRutas[i].id )
                    ))
                    .subscribe(result => {
                      this.estacionRutas.splice(i, 1);
                      console.log(i);
                    });
                    console.log(i);
                    break;
                  }
            }
          }
        }
    }
}

