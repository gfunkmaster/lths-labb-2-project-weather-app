import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { WeatherData } from "../interface/Interface";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const FavoritesContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const FavoriteCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  width: 250px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const FavoriteTitle = styled.span`
  font-size: 18px;
  color: black;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Description = styled.span`
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
`;

const Temperature = styled.span`
  font-size: 16px;
  color: #333;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  color: red;
`;

const TrashIcon = styled(FontAwesomeIcon).attrs({
  icon: faTrash,
  size: "lg",
})`
  margin-right: 0.5rem;
`;

const GoBackButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  display: inline-block;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

interface FavoritesProps {
  favorites: { id: number; data: WeatherData }[];
  onDeleteFavorite: (id: number) => void;
}

const Favorites: React.FC<FavoritesProps> = ({
  favorites,
  onDeleteFavorite,
}) => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>

     <Header/>
      <FavoritesContainer>
        {favorites.length > 0 ? (
          favorites.map((favorite, index) => (
            <FavoriteCard key={`${favorite.id}-${index}`}>
              <FavoriteTitle>
                {favorite.data.name}, {favorite.data.sys.country}
              </FavoriteTitle>
              <br />
              <Description>{favorite.data.weather[0].description}</Description>
              <br />
              <Temperature>{Math.round(favorite.data.main.temp)} °C</Temperature>
              <DeleteButton onClick={() => onDeleteFavorite(favorite.id)}>
                <TrashIcon icon={faTrash} />
              </DeleteButton>
            </FavoriteCard>
          ))
        ) : (
          <>
            <div>No favorites available.</div>
            <GoBackButton onClick={handleGoBack}>Go Back</GoBackButton>
          </>
        )}
      </FavoritesContainer>
    </>
  );
};

export default Favorites;
