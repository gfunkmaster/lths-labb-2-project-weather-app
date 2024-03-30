import styled from "styled-components";
import SearchBar from "./SearchBar";
import WeatherList from "./WeatherList";
import { useWeatherContext } from "./context/WeatherContext";
import { WeatherData } from "../interface/Interface";
import Header from "./Header";
import Footer from "./Footer";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100 %;
  margin: 0 auto;
`;

const Home = () => {
  const { state, addFavorite } = useWeatherContext(); // Access context state
  const { weatherDataList, error } = state;

  
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
    <>
      <Header />
      <HomeContainer>
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
      <Footer />
    </>
  );
};

export default Home;
