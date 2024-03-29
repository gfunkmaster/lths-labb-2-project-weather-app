import { styled } from "styled-components";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useWeatherContext } from "./componenets/context/WeatherContext";
import Favorites from "./componenets/Favorites";
import Navbar from "./componenets/Navbar";
import Home from "./componenets/Home";

// Styled component for the main container
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100vh; /* Full viewport height */
  width: 100%; /* Full viewport width */
`;

const App: React.FC = () => {
  // Assuming you have favorites and onDeleteFavorite functions available in your context
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
