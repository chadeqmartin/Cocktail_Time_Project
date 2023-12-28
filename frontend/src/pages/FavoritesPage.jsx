import { useParams, useOutletContext } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CocktailCard from "../components/CocktailCard";
import { api } from "../utilities";
import { useEffect } from "react";
import "../styles/FavoritesPageStyle.css"

export const FavoritesPage = () => {
  const { favorites, setFavorites } = useOutletContext();
  const { id } = useParams();

  const getFavorites = async () => {
    api.defaults.headers.common[
      "Authorization"
    ] = `Token ${localStorage.getItem("token")}`;
    let response = await api.get("favorites/");
    if (response.data) {
      setFavorites(response.data);
      console.log(response.data);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <>
    <div className="background"></div>
      <h2 className="text-white custom-text">My Favorites</h2>
      <Container>
        <div className="d-flex justify-content-center">
          <Row className="mb-5 custom-row" xs={1} sm={2} md={3} lg={4}>
            {favorites.map((favorite, idx) => (
              <Col key={idx} className="mx-auto">
                <CocktailCard
                  id={favorite.cocktail_id}
                  name={favorite.name}
                  setFavorites={setFavorites}
                  favorites={favorites}
                />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </>
  );
};

