import React from "react";
import Button from "react-bootstrap/Button";
import { useParams, useOutletContext } from "react-router-dom";
import { api } from "../utilities";
import { CocktailVideo } from "../components/Video";
import "../styles/CocktailDetailsStyle.css";
import { useState, useEffect } from "react";

export const CocktailDetailsPage = () => {
  const { id } = useParams();
  const { favorites, setFavorites } = useOutletContext();
  const [cocktail, setCocktail] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [userNotes, setUserNotes] = useState("");

  const getCocktail = async () => {
    try {
      let token = localStorage.getItem("token");
      if (token) {
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        let response = await api.get(`myapi/id/${id}/`);
        setCocktail(response.data.drinks[0]);
      }
    } catch (error) {
      console.error("Error updating account information:", error);
    }
  };

  useEffect(() => {
    getCocktail();
  }, []);

  useEffect(() => {
    const userNotes = favorites.find(
      (favorite) => favorite.name === cocktail.strDrink
    )?.notes;
    if (userNotes) {
      setUserNotes(userNotes);
    }
  }, [favorites, cocktail]);

  useEffect(() => {
    const newIngredients = getIngredientsArray(cocktail);
    setIngredients(newIngredients);
  }, [cocktail]);

  function getIngredientsArray(obj) {
    const ingredients = [];

    for (let i = 1; i <= 15; i++) {
      const ingredientKey = "strIngredient" + i;
      const measureKey = "strMeasure" + i;

      const measureValue = obj[measureKey];
      const ingredientName = obj[ingredientKey];

      const combinedValue = `${measureValue || ""} ${
        ingredientName || ""
      }`.trim();

      if (combinedValue) {
        ingredients.push(combinedValue);
      }
    }

    return ingredients;
  }

  const handleNoteChange = (e) => {
    setUserNotes(e.target.value);
  };

  // Function to save the user's note
  const saveNote = async (e) => {
    e.preventDefault();

    let token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      const updatedCocktail = { notes: userNotes };
      let response = await api.put(
        `cocktails/${cocktail.strDrink}/`,
        updatedCocktail
      );
    }

    console.log("User's Note:", userNotes);
  };

  return (
    <>
      <div className="background"></div>
      <div className={"cocktailDetailsContainer"}>
        <h1 className={"cocktailName"}>{cocktail.strDrink} Details Page</h1>
        <div className={"cocktailInfo"}>
          <div className={"cocktailImage"}>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrinkThumb} />
          </div>
          <div className={"ingredientsAndInstructions"}>
            <div>
              <h3>Ingredients:</h3>
              <ul>
                {ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mt-3">Instructions:</h3>
              <p>{cocktail.strInstructions}</p>
            </div>
          </div>
        </div>
        <div className={"video"}>
          {cocktail.strDrink && <CocktailVideo name={cocktail.strDrink} />}
        </div>
        {favorites.some((favorite) => favorite.name === cocktail.strDrink) && (
          <div className={"notes"}>
            <h3 className="addNotesTitle">Add Notes</h3>
            <form onSubmit={saveNote}>
              <textarea
                rows="4"
                cols="50"
                placeholder="Enter notes here"
                value={userNotes}
                onChange={handleNoteChange}
                className="text-black"
              />
              <Button className="mt-2 mb-10" type="submit">Save Notes</Button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};
