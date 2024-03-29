import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { WeatherData } from "../interface/Interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const CardContainer = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`;

const CityName = styled.h2`
  font-size: 24px;
  margin-bottom: 8px;
  color: black;
`;

const Temperature = styled.p`
  font-size: 18px;
  margin-bottom: 4px;
  color: black;
`;

const Description = styled.p`
  font-size: 16px;
  color: black;
`;

const WeatherIcon = styled.img`
  width: 50px;
  height: 50px;
`;

const LoadingMessage = styled.p`
  font-size: 18px;
  margin-top: 20px;
`;

const AddButton = styled.button`
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #0056b3;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
`;

interface Props {
  weatherData: WeatherData | null;
  loading: boolean;
  addToFavorites: (weatherData: WeatherData) => void;
  isAdded: boolean;
}

const WeatherCard: React.FC<Props> = ({
  weatherData,
  loading,
  addToFavorites,
  isAdded,
}) => {
  const [weatherIsAdded, setWeatherIsAdded] = useState(false);

  useEffect(() => {
    const storedWeatherData = localStorage.getItem("weatherData");
    const storedData = storedWeatherData ? JSON.parse(storedWeatherData) : null;
    const dataToDisplay = weatherData || storedData;

    if (dataToDisplay) {
      // Assuming you have a way to determine if weather data is in favorites
      const favoritesData = localStorage.getItem("favoritesData");
      const favorites = favoritesData ? JSON.parse(favoritesData) : [];
  
      const isInFavorites = favorites.some((fav: WeatherData) => {
        return fav.name === dataToDisplay.name; // Assuming the name uniquely identifies weather data
      });
  
      setWeatherIsAdded(isInFavorites);
    }
  }, [weatherData]);

  const handleAddToFavorites = () => {
    addToFavorites(weatherData!); // Assuming weatherData is not null here
    setWeatherIsAdded(true);
  };

  if (loading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  if (!weatherData) {
    return <CardContainer>No weather data available</CardContainer>;
  }

  const { name: city, main: { temp: temperature }, weather } = weatherData;
  const description = weather.length > 0 ? weather[0].description : "Unknown";
  const roundedTemperature = Math.round(temperature);
  const icon = weather.length > 0 ? weather[0].icon : "Unknown";

  return (
    <CardContainer>
      <CityName>{city}</CityName>
      <Temperature>{roundedTemperature}°C</Temperature>
      <WeatherIcon
        src={`https://openweathermap.org/img/w/${icon}.png`}
        alt={description}
      />
      <Description>{description}</Description>
      <AddButton onClick={handleAddToFavorites}>
        <Icon icon={faStar} />
        {weatherIsAdded ? "Added to Favorites" : "Add to Favorites"}
      </AddButton>
    </CardContainer>
  );
};

export default WeatherCard;
