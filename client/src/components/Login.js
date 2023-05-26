import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Login(props) {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      // Cleanup function to cancel any ongoing asynchronous tasks
      // For example, you can cancel axios requests using cancellation tokens
    };
  }, []);

  const handleChange = (event) => {
    const prop = event.target.name;
    setFormState({
      ...formState,
      [prop]: event.target.value,
    });
  };

  const submitLogin = async (event) => {
    event.preventDefault();
    console.log("Login submitted");
    try {
      const res = await axios.post("/auth/login", formState);
      props.setUser(res.data.user);
      setError("");
      navigate("/prompt");
      console.log(res.data.user);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data.error);
      } else {
        setError("Email and password do not match an existing user.");
      }
    }
  };

  return (
    <>
      <div className="login-register-container">
        <h3 className="login-register">Login</h3>

        <form className="login-register-form-container" onSubmit={submitLogin}>
          <input
            name="email"
            className="login-register-form-element"
            value={formState.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
          ></input>

          <input
            name="password"
            className="login-register-form-element"
            value={formState.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
          />

          {error && <p className="error-message">{error}</p>}

          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
