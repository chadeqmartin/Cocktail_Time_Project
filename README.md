# Cocktail Time App
Cocktail Time is a web application that allows users to explore a wide variety of cocktails, manage their favorites, and personalize their experience. The app uses React.js and Bootstrap for the frontend and Django Rest Framework with PostgreSQL for the backend. It features user authentication using tokens and full CRUD (Create, Read, Update, Delete) capabilities for managing users' favorite cocktails and managing users' accounts. 

## Features
### User Authentication:

- Users can sign up, log in, and log out.
- Token-based authentication ensures security.

### User Management:

Full CRUD functionality for users:

- Create new users.
- Read user details.
- Update user information.
- Delete user accounts.

### Cocktail Management:

Users can search for cocktails by ingredient or name.

Full CRUD functionality for cocktails:

- Create new favorite cocktails.
- Read cocktail details.
- Update existing favorite cocktails -users can add/edit notes to their favorite cocktails.
- Delete cocktails from their favorites.


## Third-Party APIs
Cocktail Time integrates with two third-party APIs to provide enhanced cocktail information and instructional videos:

- **CocktailDB API:** This app uses the CocktailDB API to fetch detailed cocktail information, including ingredients, instructions, and images. This API enriches the user experience by providing comprehensive cocktail data.

- **YouTube API:** When users click on a cocktail's details, Cocktail Time fetches instructional video links from YouTube. This feature allows users to watch videos on how to prepare the cocktail they are interested in, adding a practical dimension to the app.