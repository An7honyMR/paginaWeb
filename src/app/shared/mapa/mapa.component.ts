import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  template: '<div id="map" style="height: 500px;"></div>',
  styleUrls: ['./weather-map.component.css']
})
export class MapaComponent implements OnInit {

  ngOnInit(): void {
    const map = L.map('map').setView([30, -20], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=3118ea73534e20e076a9a6fc06228f37`).addTo(map);
  }
}
