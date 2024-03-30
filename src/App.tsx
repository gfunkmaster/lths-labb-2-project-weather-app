import { styled } from "styled-components";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useWeatherContext } from "./componenets/context/WeatherContext";
import Favorites from "./componenets/Favorites";
import Home from "./componenets/Home";


const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh; 
  width: 100%;
`;

const App: React.FC = () => {
  const { state, deleteFavorite } = useWeatherContext();
  const { favorites } = state;

  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites favorites={favorites} onDeleteFavorite={deleteFavorite} />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;
