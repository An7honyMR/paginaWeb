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

  volverAClima() {
    this.router.navigate(['/clima']);
  }
}
