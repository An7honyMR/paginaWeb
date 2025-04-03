import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { WeatherForecast, Pronostico } from '../../models/weather';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pronostico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pronostico.component.html',
  styleUrls: ['./pronostico.component.css']
})
export class PronosticoComponent implements OnInit {
  weatherData: WeatherForecast | null = null;
  city: string = '';
  filteredForecast: Pronostico[] = [];

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
        this.router.navigate(['/clima']);
      }
    });
  }

  getForecast(): void {
    this.weatherService.getWeatherForecast(this.city).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.filteredForecast = this.filterForecastData(data.pronosticos);
      },
      error: (error) => {
        console.error('Error fetching forecast:', error);
        // Manejo de errores opcional
      }
    });
  }

  private filterForecastData(pronosticos: Pronostico[]): Pronostico[] {
    // Filtramos para mostrar un pronóstico por día (asumiendo 8 pronósticos por día)
    return pronosticos.filter((item, index) => index % 8 === 0);
  }

  volverAClima() {
    this.router.navigate(['/clima']);
  }
}