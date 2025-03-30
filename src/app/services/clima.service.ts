import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clima } from '../models/clima';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {
  private apiKey = '3118ea73534e20e076a9a6fc06228f37';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private backendUrl = 'http://localhost:3000/rest/clima/save'; // URL para guardar el pronóstico en el backend

  constructor(private http: HttpClient) {}

  getClima(ciudad: string): Observable<Clima> {
    const url = `${this.apiUrl}?q=${ciudad}&appid=${this.apiKey}&units=metric&lang=es`;
    return this.http.get<Clima>(url);
  }

  // Método para enviar el clima al backend y guardarlo en la base de datos
  guardarClima(clima: Clima): Observable<any> {
    return this.http.post(this.backendUrl, clima);  // Enviar el clima al backend
  }
}
