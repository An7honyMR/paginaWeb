import { Component } from '@angular/core';
import { ClimaService } from './services/clima.service';
import { Clima } from './models/clima';
import { ClimaComponent } from './shared/clima/clima.component';
import { CommonModule } from '@angular/common';
import { MapaComponent } from './shared/mapa/mapa.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, ClimaComponent, MapaComponent]
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
        console.log('Datos del clima recibidos:', data); // 🔍 Ver datos recibidos
        this.climaData = data;
      },
      error: (err) => {
        console.error('Error al obtener datos:', err);
        alert('No se pudo obtener el clima. Intente con otra ciudad.');
      }
    });
  }
}
