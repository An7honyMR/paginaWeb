import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClimaService } from '../../services/clima.service';
import { Router } from '@angular/router';
import { Clima } from '../../models/clima';

@Component({
  selector: 'app-clima',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css']
})
export class ClimaComponent {
  ciudad: string = '';
  clima: any = null;
  pronostico: any[] = [];
  error: string | null = null;
  isSearched: boolean = false; // Agregado para controlar la visibilidad del botón
  cargando: boolean = false;  // Propiedad cargando añadida

  constructor(
    private climaService: ClimaService,
    private router: Router
  ) {}

  consultarClima() {
    if (this.ciudad.trim() === '') {
      this.error = 'Por favor, ingresa una ciudad.';
      return;
    }

    this.climaService.getClima(this.ciudad).subscribe(
      (data: any) => {
        this.clima = data;
        this.error = null;
        this.isSearched = true;

        // Simula datos de pronóstico (puedes reemplazar esto con una llamada a la API)
        this.pronostico = [
          { fecha: 'Lun', temp: 25, iconUrl: 'https://cdn-icons-png.flaticon.com/512/1163/1163661.png' },
          { fecha: 'Mar', temp: 27, iconUrl: 'https://cdn-icons-png.flaticon.com/512/1163/1163661.png' },
          { fecha: 'Mié', temp: 24, iconUrl: 'https://cdn-icons-png.flaticon.com/512/1163/1163661.png' },
          { fecha: 'Jue', temp: 22, iconUrl: 'https://cdn-icons-png.flaticon.com/512/1163/1163661.png' },
          { fecha: 'Vie', temp: 26, iconUrl: 'https://cdn-icons-png.flaticon.com/512/1163/1163661.png' }
        ];
      },
      (error: any) => {
        this.clima = null;
        this.pronostico = [];
        this.error = 'No se pudo obtener el clima para la ciudad especificada.';
      }
    );
  }

  obtenerYGuardarClima(ciudad: string): void {
    this.cargando = true;
    this.error = '';
  
    this.climaService.getClima(ciudad).subscribe({
      next: (respuestaAPI) => {
        // Crear un objeto con la estructura definida en la interfaz Clima
        const climaFormateado: Clima = {
          name: respuestaAPI.name,
          main: {
            temp: respuestaAPI.main.temp,
            humidity: respuestaAPI.main.humidity
          },
          weather: respuestaAPI.weather.map(w => ({
            description: w.description,
            icon: w.icon
          })),
          wind: {
            speed: respuestaAPI.wind.speed
          }
        };
  
        // Guardar el clima en el backend
        this.climaService.guardarClima(climaFormateado).subscribe({
          next: (respuestaBackend) => {
            console.log('Clima guardado exitosamente:', respuestaBackend);
            this.cargando = false;
          },
          error: (err) => {
            this.error = 'Error al guardar clima en el backend: ' + err.message;
            console.error('Error al guardar:', err);
            this.cargando = false;
          }
        });
      },
      error: (err) => {
        this.error = 'Error al obtener datos del clima: ' + err.message;
        console.error('Error al obtener datos:', err);
        this.cargando = false;
      }
    });
  }  

  verPronosticoCompleto() {
    if (this.ciudad) {
      this.router.navigate(['/pronostico'], { queryParams: { ciudad: this.ciudad } });
    }
  }
}