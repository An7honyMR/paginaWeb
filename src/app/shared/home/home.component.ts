import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  ciudad: string = '';

  constructor(private router: Router) {}

  buscarCiudad() {
    if (this.ciudad.trim() !== ''){
      this.router.navigate(['/clima'], { queryParams: { ciudad: this.ciudad } });
    }
  }

}
