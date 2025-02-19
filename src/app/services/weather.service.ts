import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherForecast } from '../models/weather';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  private apiKey = '405b9f75cbb2f52d6dbc085904e0867c';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) { }

  getWeatherForecast(city:string): Observable<WeatherForecast> {
    return this.http.get<WeatherForecast>(`${this.apiUrl}?q=${city}&units=metric&appid=${this.apiKey}&lang=es`);
  }

}
