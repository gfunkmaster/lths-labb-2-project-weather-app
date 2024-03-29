import React from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import WeatherList from "./WeatherList";
import { useWeatherContext } from "./context/WeatherContext";
import ErrorBoundary from "./ErrorBoundry";
import { WeatherData } from "../interface/Interface";
import Navbar from "./Navbar";

// Define a styled div for the home page container
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Home = () => {
  const { state, deleteFavorite, addFavorite } = useWeatherContext(); // Access context state
  const { weatherDataList, weatherData, error } = state;

  // Customize error messages based on different error scenarios
  const getErrorMessage = () => {
    if (error && error.code === 404) {
      return "City not found. Please enter a valid city name.";
    } else if (error && error.code === 429) {
      return "Too many requests. Please try again later.";
    } else if (error && error.code === 401) {
      return "Invalid API key. Please check your API key.";
    } else {
      return "An error occurred. Please try again later.";
    }
  };

  return (
    <ErrorBoundary>
      <HomeContainer>
        <h1>Welcome to Weather App</h1>
        <Navbar />
        <SearchBar />
        {error ? (
          <div>Error: {getErrorMessage()}</div>
        ) : (
          <WeatherList
            weatherData={weatherDataList}
            loading={state.loading}
            addToFavorites={(weather: WeatherData) =>
              addFavorite(weather.id, weather)
            }
          />
        )}
      </HomeContainer>
    </ErrorBoundary>
  );
};

export default Home;
