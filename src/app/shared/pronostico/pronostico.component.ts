import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { WeatherForecast } from '../../models/weather';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pronostico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pronostico.component.html',
  styleUrls: ['./pronostico.component.css']
})
export class PronosticoComponent implements OnInit {
  weatherData!: WeatherForecast;
  city: string = '';
  http: any;
  cargando: boolean = false;  // Propiedad cargando añadida
  error: string | null = null;  // Propiedad error añadida

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['ciudad']) {
        this.city = params['ciudad'];
        this.getForecast();
      } else {
        // Si no hay ciudad en los parámetros, redirigir a la pestaña de clima
        this.router.navigate(['/clima']);
      }
    });
  }

  getForecast(): void {
    this.weatherService.getWeatherForecast(this.city).subscribe(data => {
      this.weatherData = data;
    });
  }

  obtenerYGuardarPronostico(ciudad: string): void {
    this.cargando = true;
    this.error = '';
  
    // Llamada a la API para obtener el pronóstico del clima
    this.weatherService.getWeatherForecast(ciudad).subscribe({
      next: (respuestaAPI) => {
        // Obtener el nombre de la ciudad y el primer elemento de la lista de pronósticos
        const ciudadNombre = respuestaAPI.city.name;
        const primerPronostico = respuestaAPI.list[0];  // Suponiendo que tomas el primer pronóstico
  
        // Transformar los datos al formato que espera tu backend
        const datosFormateados = {
          ciudad: ciudadNombre,
          temperatura: primerPronostico.main.temp,
          humedad: primerPronostico.main.humidity,
          viento: primerPronostico.wind.speed,
          descripcion: primerPronostico.weather[0].description,
          icono: primerPronostico.weather[0].icon
        };
  
        // Guardar en el backend
        this.weatherService.saveWeatherForecast(datosFormateados).subscribe({
          next: (respuestaBackend) => {
            this.weatherData = respuestaBackend;
            console.log('Datos guardados exitosamente:', respuestaBackend);
            this.cargando = false;
          },
          error: (err) => {
            this.error = 'Error al guardar datos en el backend: ' + err.message;
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

  volverAClima() {
    this.router.navigate(['/clima']);
  }

}
