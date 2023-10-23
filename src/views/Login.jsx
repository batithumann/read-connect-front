import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../Context";

function Login() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { user, setUser } = useContext(Context);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const login = async () => {
    const urlServer = process.env.REACT_APP_BACKEND_URL;
    const endpoint = "/login";
    try {
      const credentials = {
        email: formState.email,
        password: formState.password,
      };
      const { data: token } = await axios.post(
        urlServer + endpoint,
        credentials
      );
      localStorage.setItem("token", token);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <input
        name="email"
        type="text"
        value={formState.email}
        onChange={handleInputChange}
        required
      />
      <input
        name="password"
        type="password"
        value={formState.password}
        onChange={handleInputChange}
        required
      />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
