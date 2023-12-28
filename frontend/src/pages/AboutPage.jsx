import "../styles/AboutPageStyle.css";

export const AboutPage = () => {
  return (
    <>
      <div>
      <div className="aboutPageImage"></div>
      <div className="overlay"></div>
      </div>
      <div className="about-page-container">
      <div className="text-white ml-10 mt-11">
        <h1 className="mb-2 custom-text-size">Welcome to Cocktail Time</h1>
        <h2 className="mb-2 custom-text-size2">Hi, I'm Chad an aspiring Full Stack Web Developer.</h2>
        
        <p>
          Cocktail Time is in partial fullfillment of my training at Code
          Platoon, a coding bootcamp for Veterans, transitioning Active-Duty Servicemembers,
          and Spouses. I've used React/Bootstrap for my frontend and Django/REST
          framework with PostreSQL for my backend. I've used 3rd Party APIs from the Cocktail
          Database and from YouTube. Background photos/videos are courtesy of
          Pixels.
        </p>
      </div>
      </div>
    </>
  );
};
