import { Routes } from '@angular/router';
import { ClimaComponent } from './shared/clima/clima.component';
import { WeatherMapComponent } from './shared/weather-map/weather-map.component';
import { HomeComponent } from './shared/home/home.component'; // Cambiado a HomeComponent

export const appRoutes: Routes = [
  { path: '', component: HomeComponent }, // Ruta para la página de inicio
  { path: 'clima', component: ClimaComponent },
  { path: 'mapa', component: WeatherMapComponent },
];
