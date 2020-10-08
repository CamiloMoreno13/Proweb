import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HorarioConductor } from '../clases/horario-conductor';

@Injectable({
  providedIn: 'root'
})
export class HorarioConductorService {

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
    const url = `${environment.urlConductor}/horarioConductores`;
    return this.get<HorarioConductor[]>(url);
  }

  update(horarioConductor: HorarioConductor) {
    const url = `${environment.urlConductor}/horarioConductores/${horarioConductor.id}`;
    return this.put(url, {
      fecha: horarioConductor.fecha
    });
  }

  create(horario: HorarioConductor)  {
    const url = `${environment.urlConductor}/horarioConductores/${horario.conductor.id}/${horario.bus.id}`;
    return this.post(url, {
      fecha: horario.fecha
    });
  }

  deleteElement(id: number) {
    const url = `${environment.urlConductor}/horarioConductores/${id}`;
    return this.delete(url);
  }
}
