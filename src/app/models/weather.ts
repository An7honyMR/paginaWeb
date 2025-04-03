// export interface WeatherForecast {
//   city: {
//     name: string;
//   };
//   list: ForecastItem[];
// }

// export interface ForecastItem {
//   dt: number;
//   dt_txt: string;
//   main: {
//     temp: number;
//     humidity: number;
//     pressure: number;       // Agregado: Presión atmosférica
//     feels_like: number;     // Agregado: Sensación térmica
//   };
//   wind: {
//     speed: number;
//     deg: number;            // Dirección del viento, si es necesario
//   };
//   weather: {
//     description: string;
//     icon: string;
//   }[];
//   pop?: number;  // Agregamos la propiedad pop, que es opcional
// }

export interface WeatherForecast {
  success:     boolean;
  ciudad:      string;
  coordenadas: Coordenadas;
  pais:        string;
  pronosticos: Pronostico[];
}

export interface Coordenadas {
  lat: number;
  lon: number;
}

export interface Pronostico {
  fecha:       Date;
  hora:        string;
  temperatura: number;
  descripcion: string;
  icono:       string;
  humedad:     number;
  viento:      number;
}

