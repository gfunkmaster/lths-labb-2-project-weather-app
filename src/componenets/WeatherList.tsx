import { FC } from 'react';
import styled from 'styled-components';
import WeatherCard from './WeatherCard'; // Import WeatherCard component
import { WeatherData } from '../interface/Interface'; // Import WeatherData interface
import { useWeatherContext } from './context/WeatherContext';

// Styled component for the weather list container
const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
`;

interface Props {
  weatherData: WeatherData[]; // Specify type for weatherData prop
  loading: boolean; // Add the loading property
  addToFavorites: (weather: WeatherData) => void; // Add the addToFavorites property
}

const WeatherList: FC<Props> = ({ weatherData }) => {
  const { addFavorite } = useWeatherContext();

  // Reverse the order of weatherData array to display the latest search on top
  const reversedWeatherData = [...weatherData].reverse();

  const handleAddToFavorites = (weather: WeatherData) => {
    addFavorite(weather.id, weather); // Pass id and weather data to addFavorite
  };

  return (
    <ListContainer>
      {reversedWeatherData.map((weather, index) => (
        <WeatherCard
          key={`${weather.id}_${index}`}
          weatherData={weather}
          loading={weather.loading}
          addToFavorites={handleAddToFavorites} isAdded={false}        />
      ))}
    </ListContainer>
  );
};

export default WeatherList;
