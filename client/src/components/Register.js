import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Register(props) {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitRegister = async (event) => {
    event.preventDefault();
    console.log("Register submitted");
    try {
      const res = await axios.post("/auth/register", formState);
      props.setUser(res.data.user);
      setError("");
      navigate("/prompt");
      console.log(res.data.user);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data.error);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <div className="login-register-container">
        <h3 className="login-register">Register</h3>

        <form
          className="login-register-form-container"
          onSubmit={submitRegister}
        >
          <input
            name="email"
            className="login-register-form-element"
            value={formState.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
          />
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

export default Register;
