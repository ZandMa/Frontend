import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {AuthContext} from "../context/auth.context";

function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => { 
    e.preventDefault();

    const userDetails = {
      username,
      password
    }


    axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, userDetails)
      .then((response) => {

          storeToken(response.data.authToken);
          authenticateUser();
          navigate("/");
      })
      .catch( error => {
        const msg = error.response.data.errorMessage;
        console.log("error Login user...", msg);
        setErrorMessage(msg);
      });

  };

  return (
    <div className="LoginPage">
      <h1>Login</h1>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleLoginSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsername}
          />
        </label>

        <label>Password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        </label>

        <button type="submit">Login</button>
      </form>
      

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  )
}

export default LoginPage;
