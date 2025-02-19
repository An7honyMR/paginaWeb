import { Component } from '@angular/core';
import { ClimaService } from './services/clima.service';
import { Clima } from './models/clima';
import { ClimaComponent } from './shared/clima/clima.component';
import { WeatherMapComponent } from './shared/weather-map/weather-map.component';
import { RouterModule } from '@angular/router';
import { PronosticoComponent } from './shared/pronostico/pronostico.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [ClimaComponent, WeatherMapComponent, RouterModule, PronosticoComponent],
})
export class AppComponent {
  title = 'ClimaApp';
  city: string = '';
  climaData?: Clima;

  constructor(private climaService: ClimaService) {}

  fetchClima() {
    if (this.city.trim() === '') {
      alert('Por favor, ingrese una ciudad.');
      return;
    }

    this.climaService.getClima(this.city).subscribe({
      next: (data) => {
        console.log('Datos del clima recibidos:', data);
        this.climaData = data;
      },
      error: (err) => {
        console.error('Error al obtener datos:', err);
        alert('No se pudo obtener el clima. Intente con otra ciudad.');
      }
    });
  }
}
