import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { api } from "../utilities";
import { useNavigate, useOutletContext } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useOutletContext();
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    let response = await api.post("users/login/", {
      email: email,
      password: password,
    });
    if (response.status === 200) {
      setUser(response.data.user);
      // localStorage.setItem('user', user)
      // console.log(user)
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
    <Form onSubmit={(e) => login(e)}>
      <h4>Log In</h4>
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
        Log In
      </Button>
    </Form>
  );
};

export default Login;
