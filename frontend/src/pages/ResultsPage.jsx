import React, { useEffect } from "react";
import CocktailCard from "../components/CocktailCard";
import { useParams, useOutletContext } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/ResultsPageStyle.css";

export const ResultsPage = () => {
  const { cocktails, favorites, setFavorites } = useOutletContext();
  const { searchTerm } = useParams();


  return (
    <>
      <div className="resultPageImage"></div>
      <div className="mt-5">
        <div>
          <h1>Results for: {searchTerm}</h1>
        </div>

        <Container>
        <div className="d-flex justify-content-center">
          <Row className="mb-5 custom-row" xs={1} sm={2} md={3} lg={4} >
            {cocktails.map((cocktail, idx) => (
              <Col key={idx} className="mx-auto">
                <CocktailCard
                  id={cocktail.idDrink}
                  name={cocktail.strDrink}
                  image={cocktail.strDrinkThumb}
                  setFavorites={setFavorites}
                  favorites={favorites}
                />
              </Col>
            ))}
          </Row>
          </div>
        </Container>
      </div>
    </>
  );
};
