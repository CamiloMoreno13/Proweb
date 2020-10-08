import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Bus } from '../clases/bus';
import { HorarioBus } from '../clases/horario-bus';

@Injectable({
  providedIn: 'root'
})
export class BusService {

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
      catchError(this.handleError),
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
    id: number // : Observable<Bus>
  ) {
    const url = `${environment.urlBus}/buses/${id}`;
    return this.get<Bus>(url);
  }

  findHorariosById(
    id: number // : Observable<Bus>
  ) {
    const url = `${environment.urlBus}/buses/${id}/horarioBus`;
    return this.get<HorarioBus[]>(url);
  }

  findAll() {
    const url = `${environment.urlBus}/buses`;
    return this.get<Bus[]>(url);
  }

  update(bus: Bus) {
    const url = `${environment.urlBus}/buses/${bus.id}`;
    return this.put(url, {
      placa: bus.placa,
      modelo: bus.modelo
    });
  }
  create(bus: Bus)  {
    const url = `${environment.urlBus}/buses`;
    return this.post(url, {
      id: null,
      placa: bus.placa,
      modelo: bus.modelo
    });
  }

  deleteElement(id: number) {
    const url = `${environment.urlBus}/buses/${id}`;
    return this.delete(url);
  }

  deleteHorario( idBus: number, idHorario: number){
    const url = `${environment.urlBus}/buses/${idBus}/horarioBus/${idHorario}`;
    return this.delete(url);
  }
}
