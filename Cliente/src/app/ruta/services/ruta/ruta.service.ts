import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Ruta } from '../../clases/ruta/ruta';
import { HorarioRuta } from '../../clases/ruta/horario-ruta';
import { EstacionRutas } from '../../clases/ruta/estacion-rutas';

@Injectable({
  providedIn: 'root'
})
export class RutaService {

  constructor( private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error);
    return throwError('An error has occurred');
  }

  private get<T>(url): Observable<T> {
    console.log('get:', url);
    return this.http
      .get<T>(url, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }),
        withCredentials: true
      })
      .pipe(
        // retry(5),
        catchError(this.handleError)
      );
  }

  private post<T>(url, data: T): Observable<T> {
    console.log('post:', url);
    return this.http
      .post<T>(url, data, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        withCredentials: true
      })
      .pipe(
        // retry(5),
        catchError(this.handleError)
      );
  }

  private put<T>(url, data: T): Observable<T> {
    console.log('put:', url);
    return this.http.put<T>(url,
      data,
      {withCredentials: true}
    ).pipe(
      // retry(5),
      catchError(this.handleError)
    );
  }

  private delete<T>(url): Observable<T> {
    console.log('delete:', url);
    return this.http.delete<T>(url, {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      }),
      withCredentials: true
    })
    .pipe(
      // retry(5),
      catchError(this.handleError)
    );
  }

  findById(
    id: number // : Observable<Ruta>
  ) {
    const url = `${environment.urlPublica}/rutas/${id}`;
    return this.get<Ruta>(url);
  }

  findHorariosById(
    id: number // : Observable<Ruta>
  ) {
    const url = `${environment.urlPublica}/rutas/${id}/horarioRuta`;
    return this.get<HorarioRuta[]>(url);
  }

  findEstacionesById(
    id: number // : Observable<Ruta>
  ) {
    const url = `${environment.urlPublica}/rutas/${id}/estaciones`;
    return this.get<EstacionRutas[]>(url);
  }

  findAll() {
    const url = `${environment.urlPublica}/rutas`;
    return this.get<Ruta[]>(url);
  }

  update(ruta: Ruta) {
    const url = `${environment.urlRuta}/rutas/${ruta.id}`;
    return this.put(url, {
      codigo: ruta.codigo
    });
  }
  create(ruta: Ruta)  {
    const url = `${environment.urlRuta}/rutas`;
    return this.post(url, {
      id: ruta.id,
      codigo: ruta.codigo
    });
  }

  addEstacion(idRuta: number, idEstacion: number){

    const url = `${environment.urlRuta}/estacionRutas/${idRuta}/${idEstacion}`;
    return this.post(url, {
      ruta: null,
      estacion: null
    });
  }

  deleteElement(id: number) {
    const url = `${environment.urlRuta}/rutas/${id}`;
    return this.delete(url);
  }

  deleteEstacion(idRuta: number, idEstacionRuta: number){
    const url = `${environment.urlEstacion}/rutas/${idRuta}/estaciones/${idEstacionRuta}`;
    return this.delete(url);
  }

  deleteHorario(idRuta: number, idHorario: number){
    const url = `${environment.urlEstacion}/rutas/${idRuta}/horarioRuta/${idHorario}`;
    return this.delete(url);
  }

  logout() {
    return this.http.post('http://localhost:8080/logout', '', {
      withCredentials: true
    });
  }
  
}
