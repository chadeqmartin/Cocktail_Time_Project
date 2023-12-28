import { useState, useEffect, useRef } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import pexels_videos from "/src/assets/pexels_videos_2908.mp4";
import Register from "../components/Register";
import Login from "../components/Login";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";

export const HomePage = () => {
  const { user, setUser } = useOutletContext();
  const [existingUser, setExistingUser] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/landing");
    }
  }, []);

  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    video.play().catch((error) => {
      console.error(error);
    });

    return () => {
      // Cleanup when the component unmounts
      video.pause();
    };
  }, []);

  return (
    <>
      <div className="h-full w-full top-0 absolute -z-10">
        <video ref={videoRef} autoPlay muted loop>
          <source src={pexels_videos} type="video/mp4" />
        </video>
        <div className="overlay"></div>
      </div>

      <div className="text-white">
        <h1>Welcome to Cocktail Time</h1>
        <h2>Sign up if you're new (it's totaly free) or simply login if this isn't your first rodeo.</h2>
        <h3>Inside you'll find lots of great cocktail recipes, photos for inspiration and informative videos</h3>
      </div>
      <Container className="homepage-container mt-5 mt-lg-5 mx-auto">
        <div className="text-white">
          {existingUser ? (
            <>
              <Register setUser={setUser} />
              <Button
                variant="outline-success"
                className="text-white"
                onClick={() => setExistingUser(!existingUser)}
              >
                Already have an account
              </Button>
            </>
          ) : (
            <>
              <Login setUser={setUser} />
              <Button
                variant="outline-success"
                className="text-white"
                onClick={() => setExistingUser(!existingUser)}
              >
                Don't have an account
              </Button>
            </>
          )}
        </div>
      </Container>
    </>
  );
};
