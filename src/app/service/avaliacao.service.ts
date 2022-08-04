import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Avaliacao } from '../model/Avaliacao';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

  constructor(
    private http:HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token),
  }

  getAllAvaliacao():Observable<Avaliacao[]> {
    return this.http.get<Avaliacao[]>('https://releiame.herokuapp.com/avaliacao', this.token)

  }

  getAvaliacaoById(id: number):Observable<Avaliacao>{
    return this.http.get<Avaliacao>(`https://releiame.herokuapp.com/avaliacao/${id}`, this.token)
  }

  adicionar(avaliacao: Avaliacao):Observable<Avaliacao>{
    return this.http.post<Avaliacao>('https://releiame.herokuapp.com/avaliacao', avaliacao, this.token)
  }


  put(avaliacao: Avaliacao):Observable<Avaliacao>{
    return this.http.put<Avaliacao>('https://releiame.herokuapp.com/avaliacao', avaliacao, this.token)
  }

  delete(id: number){
    return this.http.delete(`https://releiame.herokuapp.com/avaliacao/${id}`, this.token)
  }

}
