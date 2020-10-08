import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Conductor } from '../clases/conductor';
import { HorarioConductor } from '../clases/horario-conductor';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {

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
    return this.http.put<T>(url, data, { withCredentials: true}).pipe(
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
    id: number // : Observable<Conductor>
  ) {
    const url = `${environment.urlConductor}/conductores/${id}`;
    return this.get<Conductor>(url);
  }

  findHorariosById(
    id: number // : Observable<Conductor>
  ) {
    const url = `${environment.urlConductor}/conductores/${id}/horarioConductor`;
    return this.get<HorarioConductor[]>(url);
  }

  findAll() {
    const url = `${environment.urlConductor}/conductores`;
    return this.get<Conductor[]>(url);
  }

  update(conductor: Conductor) {
    const url = `${environment.urlConductor}/conductores/${conductor.id}`;
    return this.put(url, {
      nombre: conductor.nombre,
      cedula: conductor.cedula,
      telefono: conductor.telefono,
      direccion: conductor.direccion

    });
  }
  create(conductor: Conductor)  {
    const url = `${environment.urlConductor}/conductores`;
    return this.post(url, {
      id: conductor.id,
      nombre: conductor.nombre,
      cedula: conductor.cedula,
      telefono: conductor.telefono,
      direccion: conductor.direccion
    });
  }

  deleteElement(id: number) {
    const url = `${environment.urlConductor}/conductores/${id}`;
    return this.delete(url);
  }

  deleteHorario(idConductor: number, idHorario: number){
    const url = `${environment.urlConductor}/conductores/${idConductor}/horarioConductor/${idHorario}`;
    return this.delete(url);
  }
}
