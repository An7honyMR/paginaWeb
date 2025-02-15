import { Component, OnInit } from '@angular/core';

declare const L: any; // Declaración de la librería Leaflet

@Component({
  selector: 'app-weather-map',
  templateUrl: './weather-map.component.html',
  styleUrls: ['./weather-map.component.css']
})
export class WeatherMapComponent implements OnInit {
  private map: any;
  private weatherLayer: any;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {  // Usamos setTimeout para asegurarnos de que la vista esté cargada antes de crear el mapa
      this.initMap();
    }, 0);
  }

  private initMap(): void {
    console.log("Inicializando el mapa...");  // Agrega un log para verificar si se ejecuta
    this.map = L.map('map').setView([-0.1807, -78.4678], 6);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  
    this.weatherLayer = L.tileLayer('https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=3118ea73534e20e076a9a6fc06228f37', {
      attribution: '© OpenWeatherMap',
      maxZoom: 18,
      opacity: 0.5
    }).addTo(this.map);
  }
  
}
