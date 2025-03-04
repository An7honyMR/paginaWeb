import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClimaService } from '../../services/clima.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { WeatherForecast } from '../../models/weather';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-clima',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css']
})
export class ClimaComponent{
  weatherData!: WeatherForecast;

  ciudad: string = '';
  clima: any = null;
  pronostico: any[] = [];
  error: string | null = null;
  isSearched: boolean = false; // Agregado para controlar la visibilidad del botón

  constructor(
    private climaService: ClimaService,
    private router: Router,
    private route: ActivatedRoute,
    private weatherService: WeatherService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['ciudad']) {
        this.ciudad = params['ciudad'];
        this.consultarClima();
      } else {
        // Si no hay ciudad en los parámetros, redirigir a la pestaña de clima
        this.router.navigate(['/clima']);
      }
    });
  }

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
        /*this.pronostico = [
          { fecha: 'Lun', temp: 25, iconUrl: 'https://cdn-icons-png.flaticon.com/512/1163/1163661.png' },
          { fecha: 'Mar', temp: 27, iconUrl: 'https://cdn-icons-png.flaticon.com/512/1163/1163661.png' },
          { fecha: 'Mié', temp: 24, iconUrl: 'https://cdn-icons-png.flaticon.com/512/1163/1163661.png' },
          { fecha: 'Jue', temp: 22, iconUrl: 'https://cdn-icons-png.flaticon.com/512/1163/1163661.png' },
          { fecha: 'Vie', temp: 26, iconUrl: 'https://cdn-icons-png.flaticon.com/512/1163/1163661.png' }
        ];*/
      },
      (error: any) => {
        this.clima = null;
        this.pronostico = [];
        this.error = 'No se pudo obtener el clima para la ciudad especificada.';
      }
    );
  }

  verPronosticoCompleto() {
    if (this.ciudad) {
      this.router.navigate(['/pronostico'], { queryParams: { ciudad: this.ciudad } });
    }
  }
}