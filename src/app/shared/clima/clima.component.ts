import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClimaService } from '../../services/clima.service';

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

  constructor(
    private climaService: ClimaService
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

        // Simula datos de pronóstico
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
}