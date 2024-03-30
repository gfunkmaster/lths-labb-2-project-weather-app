import React, { FC, createContext, useContext, useEffect, useState } from "react";
import { WeatherData } from "../../interface/Interface";

// interface WeatherData {
//   temperature: number;
//   description: string;
//   iconUrl: string;
//   city: string;
//   country: string;
// }

interface ErrorData {
  message: string;
  code?: number;
}

interface WeatherContextState {
  weatherData: WeatherData | null;
  weatherDataList: WeatherData[]; // Array of weather data
  error: ErrorData | null;
  loading: boolean;
  favorites: { id: number; data: WeatherData }[];
}

interface WeatherContextType {
  state: WeatherContextState;
  fetchWeatherData: (city: string) => Promise<void>;
  addFavorite: (id: number, data: WeatherData) => void;
  deleteFavorite: (id: number) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error("useWeatherContext must be used within a WeatherProvider");
  }

  return context;
};

const apiKey = "e4229d802ec19fa775b6aaa5524286bf";

const getLocalStorage = (): WeatherContextState => {
  const storedData = localStorage.getItem("weatherData");
  if (storedData) {
    const parsedData = JSON.parse(storedData);

    if (!Array.isArray(parsedData.favorites)) {
      parsedData.favorites = [];
    }
    return parsedData;
  } else {
    return {
      weatherData: null,
      weatherDataList: [],
      error: null,
      loading: false,
      favorites: [] 
    };
  }
};


export const WeatherProvider: FC<{ children: React.ReactNode }> = ({ children }) => {

  const [state, setState] = useState<WeatherContextState>(getLocalStorage());
   
   useEffect(() => {
    localStorage.setItem("weatherData", JSON.stringify(state));
  }, [state]);

  const fetchWeatherData = async (city: string) => {
    try {
      setState((prevState) => ({ ...prevState, loading: true }));
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (response.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      }

      if (response.status === 401) {
        throw new Error('Invalid API key');
      }

      const data = await response.json();
      setState((prevState) => ({
        ...prevState,
        weatherData: data,
        weatherDataList: [...prevState.weatherDataList, data],
        error: null,
        loading: false,
        favorites: []
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error: {
          message: error instanceof Error ? error.message : 'An error occurred.',
        },
        loading: false,
      }));
    }
  };

  const addFavorite = (id:number, data: WeatherData) => {
    setState((prevState) => ({
      ...prevState,
      favorites: [...prevState.favorites, {id, data}]
    }))
  }

  const deleteFavorite = (id: number) => {
    setState((prevState) => ({
      ...prevState,
      favorites: prevState.favorites.filter((fav) => fav.id !== id),
    }));
  }


  useEffect(() => {
    localStorage.setItem("weatherData", JSON.stringify(state));
  }, [state]);

  const contextValue: WeatherContextType = {
    state,
    fetchWeatherData,
    addFavorite,
    deleteFavorite
  };

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
