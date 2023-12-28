import React from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { api } from "../utilities";
import { CocktailVideo } from '../components/Video'
import "../styles/CocktailDetailsStyle.css";
import { useState, useEffect } from "react";

export const CocktailDetailsPage = () => {
  const { id } = useParams();
  const { favorites, setFavorites } = useOutletContext();
  const [cocktail, setCocktail] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [userNotes, setUserNote] = useState("");
  const [vidData, setVidData] = useState(null);

  const getCocktail = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      let response = await api.get(`myapi/id/${id}/`);
      setCocktail(response.data.drinks[0]);
    }
  };

  useEffect(() => {
    getCocktail();
  }, []);

  useEffect(() => {
    const newIngredients = getIngredientsArray(cocktail);
    setIngredients(newIngredients);
  }, [cocktail]);


  // useEffect(() => {
  //   setFavorites(favorites.includes(id));
  // }, [favorites, id]);

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

  
    // const getVidData = async () => {
    //     try {
    //         api.defaults.headers.common[
    //     "Authorization"
    //   ] = `Token ${localStorage.getItem("token")}`;
    //         const response = await api.get(`myapi/vid/${cocktail}/`);
    //         setVidData(response.data)
    //     } catch (error) {
    //         console.error('Error getting video', error);
    //     }
    // }

    // useEffect (() => {
    //     getVidData();
    // }, [name])

  const handleNoteChange = (event) => {
    setUserNote(event.target.value);
  };

  // Function to save the user's note
  const saveNote = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      let response = await api.put(`myapi/cocktails/${cocktail.strDrink}/`);
      setCocktail(response.data);
    }

    console.log("User's Note:", note);
  };

  return (
    <>
      <div className="cocktailDetailsImage"></div>
      <div className="text-white">
        <div className="text-white">
          <h1>{cocktail.strDrink} Details Page</h1>
        </div>
        <div>
          <img src={cocktail.strDrinkThumb} alt={cocktail.strDrinkThumb}></img>
        </div>
        <div>
          <h3>Ingredients:</h3>

          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Instructions:</h3>
          <p>{cocktail.strInstructions}</p>
        </div>
        <div>
        {cocktail.strDrink && (<CocktailVideo name={cocktail.strDrink}/>)}
        </div>
        <div>
          <h3>Add Notes</h3>
          <textarea
            rows="4"
            cols="50"
            value={userNotes}
            onChange={handleNoteChange}
            placeholder="Enter your notes here"
          />
          <button onClick={saveNote}>Save Notes</button>
        </div>
      </div>
    </>
  );
};
