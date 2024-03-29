import React from 'react';
import styled from 'styled-components';
import WeatherCard from './WeatherCard'; // Import WeatherCard component
import { useWeatherContext } from './context/WeatherContext';
 // Import useWeather hook

// Define interface for weather data
interface WeatherData {
    temperature: number;
    description: string;
    iconUrl: string;
    city: string;
    country: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoadingMessage = styled.p`
  font-size: 18px;
  margin-top: 20px;
`;

const ErrorMessage = styled.p`
  font-size: 18px;
  color: red;
  margin-top: 20px;
`;

const WeatherDisplay = () => {
  const { state } = useWeatherContext(); // Access context state
  const { weatherData, loading, error } = state;

  // Specify the type of weatherData using the WeatherData interface
  const data: WeatherData | null = weatherData;

  return (
    <Container>
      {loading && <LoadingMessage>Loading...</LoadingMessage>}
      {error && <ErrorMessage>Error: {error.message}</ErrorMessage>}
      {data && <WeatherCard weatherData={data} />}
    </Container>
  );
};

export default WeatherDisplay;
