import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { api } from "../utilities";
import { useNavigate } from "react-router-dom";

const Register = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    let response = await api.post("users/signup/", {
      email: email,
      password: password,
      display_name: displayName,
    });
    if (response.status === 201) {
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      api.defaults.headers.common[
        "Authorization"
      ] = `Token ${response.data.token}`;
      navigate("landing/");
    } else {
      alert("Something Went wrong");
    }
  };

  return (
    <Form onSubmit={(e) => register(e)}>
      <h4>Register</h4>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="name@example.com"
          style={{ opacity: 0.7 }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Display Name</Form.Label>
        <Form.Control
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          type="text"
          placeholder="Enter a display name"
          style={{ opacity: 0.7 }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          style={{ opacity: 0.7 }}
        />
      </Form.Group>
      <Button
        type="submit"
        variant="outline-success"
        className="text-white mb-3"
      >
        Register
      </Button>
    </Form>
  );
};

export default Register;
