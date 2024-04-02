import { useState } from "react";
import { useWeatherContext } from "./context/WeatherContext";
import styled from "styled-components";

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const SearchBar = () => {
  const { fetchWeatherData } = useWeatherContext();
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim() !== "") {
      fetchWeatherData(city);
      setCity("");
    }
  };

  return (
    <>
      <SearchBarWrapper>
        <Input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter a city name"
        />
        <Button onClick={handleSearch}>Search</Button>
      </SearchBarWrapper>
    </>
  );
};

export default SearchBar;
