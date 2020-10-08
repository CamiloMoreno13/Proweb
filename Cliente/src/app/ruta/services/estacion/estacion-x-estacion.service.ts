import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EstacionXEstacion } from '../../clases/estacion/estacion-x-estacion';

@Injectable({
  providedIn: 'root'
})
export class EstacionXEstacionService {

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
    return this.http.put<T>(url, data, {withCredentials: true}).pipe(
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


  findAll() {
    const url = `${environment.urlConductor}/EstacionXEstaciones`;
    return this.get<EstacionXEstacion[]>(url);
  }

  update( horario : EstacionXEstacion) {
    const url = `${environment.urlConductor}/EstacionXEstaciones/${horario.estacionOrigen.id}/${horario.estacionDestino.id}`;
    return this.put(url, {
      //fecha: EstacionXEstacion.fecha
    });
  }

  create(horario: EstacionXEstacion)  {
    const url = `${environment.urlEstacion}/EstacionXEstaciones/${horario.estacionOrigen.id}/${horario.estacionDestino.id}`;
    return this.post(url, {
      //fecha: horario.fecha
    });
  }

}
