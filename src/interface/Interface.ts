export interface WeatherData {
  icon: any;
    sys: any;
  id: number;
  temperature: number;
  description: string;
  iconUrl: string;
  city: string;
  country: string;
  name?: string;
  main?: any;
  weather?: any;
  loading: boolean;
   addToFavorites: any;
}

export interface ForecastData {
  date: string;
  temperature: number;
  description: string;
  iconUrl: string;
}

export interface SearchResult {
  city: string;
  country: string;
  coordinates: {
    lat: number;
    lon: number;
  };
}

export interface ErrorData {
  message: string;
  code?: number;
}

export interface WeatherContextState {
  weatherData: WeatherData | null;
  forecastData: ForecastData[] | null;
  searchResults: SearchResult[] | null;
  error: ErrorData | null;
  loading: boolean;
}
