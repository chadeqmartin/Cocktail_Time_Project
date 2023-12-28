import { Outlet } from "react-router-dom";
import Navigation from "./components/Navbar";
import { useEffect, useState } from "react";
import { api } from "./utilities.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [cocktails, setCocktails] = useState([]);

  const getInfo = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      let response = await api.get("users/info/");
      setUser(response.data);
      console.log(response.data);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <header>
        <Navigation
          user={user}
          setUser={setUser}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      </header>

      <Outlet
        context={{
          user,
          setUser,
          favorites,
          setFavorites,
          cocktails,
          setCocktails,
        }}
      />
    </>
  );
}

export default App;
