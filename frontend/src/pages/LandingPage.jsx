import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate, useOutletContext } from "react-router-dom";
import { api } from "../utilities";
import { useState, useEffect } from "react";
import "../styles/LandingPageStyle.css";

export const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { cocktails, setCocktails } = useOutletContext();
  const [radioFilter, setRadioFilter] = useState("");
  const navigate = useNavigate();
  let token = localStorage.getItem("token");

  const getCocktailsByName = async () => {
    const encodedUri = encodeURI(searchTerm);
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    let response = await api.get(`myapi/${encodedUri}`);
    setCocktails(response.data.drinks);
  };
  useEffect(() => {
    if (radioFilter === "name") {
      getCocktailsByName();
    }
  }, [radioFilter]);

  const getCocktailsByIngredient = async () => {
    const encodedUri = encodeURI(searchTerm);
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    let response = await api.get(`myapi/ing/${encodedUri}`);
    setCocktails(response.data.drinks);
  };
  useEffect(() => {
    if (radioFilter === "ingredient") {
      getCocktailsByIngredient();
    }
  }, [radioFilter]);

  const handleSearch = async () => {
    let searchPath = "";

    if (radioFilter === "name") {
      await getCocktailsByName();
    } else if (radioFilter === "ingredient") {
      await getCocktailsByIngredient();
    }

    searchPath = `/results/${searchTerm}/`;
    navigate(searchPath);
  };

  return (
    <>
      <div>
        <div className="backgroundImage"></div>
        <div className="overlay"></div>
      </div>
      <div className="flex-column justify-center items-center mr-11 ml-11 landingpage-container">
        <div className="text-white">
          <h1 className="larger-text-h1">Hello and welcome</h1>
          <p className="larger-text">
            Search below either by the name of the cocktail or by an ingredient,
            either way, we got you! If you really like one of the cocktails from
            your search, save it to your favorites for easy reference later.
            Enjoy!
          </p>
        </div>
        <Form
          className="formStyle"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Col sm={13}>
              <Form.Control
                type="text"
                placeholder="Enter Search Here"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                style={{ opacity: 0.7 }}
              />
            </Col>
          </Form.Group>
          <Row>
            <Col sm={4} className="mt-2 sm:mt-0">
              <Button
                type="submit"
                variant="outline-success"
                className="text-white"
              >
                Search
              </Button>
            </Col>
            <Col sm={8} offset={{ sm: 4 }} className="text-white">
              <Form.Check
                type="radio"
                label="Search by Name"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
                value="name"
                checked={radioFilter === "name"}
                onChange={() => setRadioFilter("name")}
              />
              <Form.Check
                type="radio"
                label="Search by Ingredient"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
                value="ingredient"
                checked={radioFilter === "ingredient"}
                onChange={() => setRadioFilter("ingredient")}
              />
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};
