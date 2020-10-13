import { Paciente } from './../_model/paciente';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  url: string = `${environment.HOST}/pacientes`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Paciente[]>(this.url);
  }

  listarPorId(idPaciente: number){
    return this.http.get<Paciente>(`${this.url}/${idPaciente}`);
  }
}
