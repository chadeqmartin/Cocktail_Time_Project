// router.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { HomePage } from "./pages/HomePage";
import { LandingPage } from "./pages/LandingPage";
import {AccountInfoPage} from "./pages/AccountInfoPage";
import {CocktailDetailsPage} from "./pages/CocktailDetailsPage";
import {AboutPage} from "./pages/AboutPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import {FavoritesPage} from "./pages/FavoritesPage";
import {ResultsPage} from "./pages/ResultsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'landing/',
        element: <LandingPage />
      },
      {
        path: 'about/',
        element: <AboutPage />
      },
      {
        path: 'account/',
        element: <AccountInfoPage />
      },
      {
        path: 'details/:id/',
        element: <CocktailDetailsPage />
      },
      {
        path: 'favorites/',
        element: <FavoritesPage />
      },
      {
        path: '/results/:searchTerm/',
        element: <ResultsPage />
      }
    ],
    errorElement: <NotFoundPage />
  }
]);

export default router;