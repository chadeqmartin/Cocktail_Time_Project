import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { api } from "../utilities";
import { useState, useEffect } from "react";

function CocktailCard({ id, name, image, setFavorites, favorites }) {
  const navigate = useNavigate();

  const addFavorite = async () => {
    try {
      api.defaults.headers.common[
        "Authorization"
      ] = `Token ${localStorage.getItem("token")}`;
      let response = await api.post("cocktails/", {
        idDrink: id,
        strName: name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromFavorite = async () => {
    try {
      api.defaults.headers.common[
        "Authorization"
      ] = `Token ${localStorage.getItem("token")}`;
      let response = await api.delete(`cocktails/${name}/`);
    } catch (error) {
      console.log(error);
    }
  };

  const favoritesHandler = () => {
    const isFavorite = favorites.some((favorite) => favorite.name === name);
    if (isFavorite) {
      const updatedFavorites = favorites.filter((favorite) => favorite.name !== name);
      setFavorites(updatedFavorites);
      removeFromFavorite()
    } else {
      setFavorites([...favorites, { id, name }]);
      addFavorite()
    }
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body className="text-center">
        <Card.Title>{name}</Card.Title>
        <Button className='text-black' variant="primary" onClick={() => navigate(`/details/${id}`)}>
          Get more details
        </Button>
      </Card.Body>
      <Button
      variant="warning"
      onClick={()=>favoritesHandler()}
    >
        {favorites.some((favorite) => favorite.name === name)
        ? 'Remove from Favorites'
        : 'Add to Favorites'}
        
        </Button>
    </Card>
  );
}
export default CocktailCard;
