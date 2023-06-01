import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Landing(props) {
  return (
    <>
      <h4 className="landing">
        "If you only had 1 minute to journal about your day, what would you
        record?"
      </h4>

      {!props.user && (
        <div className="landing-buttons-div">
          {/* { JSON.stringify(props) } */}

          <NavLink
            to="/login"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <button className="login landing-button">Login</button>
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <button className="register landing-button">Register</button>
          </NavLink>
        </div>
      )}
    </>
  );
}

export default Landing;
