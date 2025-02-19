export interface WeatherForecast {
  city: {
    name: string;
  };
  list: ForecastItem[];
}

export interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    humidity: number;
    pressure: number;       // Agregado: Presión atmosférica
    feels_like: number;     // Agregado: Sensación térmica
  };
  wind: {
    speed: number;
    deg: number;            // Dirección del viento, si es necesario
  };
  weather: {
    description: string;
    icon: string;
  }[];
  pop?: number;  // Agregamos la propiedad pop, que es opcional
}
