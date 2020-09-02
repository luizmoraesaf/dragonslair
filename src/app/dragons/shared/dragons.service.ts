import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DragonModel } from './dragon.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ArrayUtils } from 'src/app/@shared/array-utils';
import { ErrorHandlerService } from '../../@core/error-handler.service';

@Injectable()
export class DragonsService {

  private env = environment;

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
    ) { }

  public getList(): Observable<DragonModel[]> {
    return this.http.get<DragonModel[]>(`${this.env.DRAGONS_API_ENDPOINT}`).pipe(
      map(dragonList => ArrayUtils.orderBy(dragonList, 'name')),
      catchError(err => {
        this.errorHandlerService.handleError(err);
        return throwError(err)})
    );
  }

  public get(id: number): Observable<DragonModel> {
    return this.http.get<DragonModel>(`${this.env.DRAGONS_API_ENDPOINT}/${id}`).pipe(
      catchError(err => {
        this.errorHandlerService.handleError(err);
        return throwError(err)})
    );
  }

  public add(dragon: DragonModel): Observable<DragonModel> {
    return this.http.post<DragonModel>(`${this.env.DRAGONS_API_ENDPOINT}`, dragon).pipe(
      catchError(err => {
        this.errorHandlerService.handleError(err);
        return throwError(err)})
    );;
  }

  public update(dragon: DragonModel): Observable<DragonModel> {
    return this.http.put<DragonModel>(`${this.env.DRAGONS_API_ENDPOINT}/${dragon.id}`, dragon).pipe(
      catchError(err => {
        this.errorHandlerService.handleError(err);
        return throwError(err)})
    );;
  }

  public delete(id: number): Observable<DragonModel> {
    return this.http.delete<DragonModel>(`${this.env.DRAGONS_API_ENDPOINT}/${id}`).pipe(
      catchError(err => {
        this.errorHandlerService.handleError(err);
        return throwError(err)})
    );;
  }
}
