//Resources
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./features/user/userSlice";

import Login from "./components/AuthPage/Login";
import SignUp from "./components/AuthPage/SignUp";
import UserHomePage from "./components/UserHomePage/UserHomePage";
import Background from "./components/BackgroundPage/Background";
import Storyline from "./components/StoryLinePage/Storyline";
import Adventure from "./components/AdventurePage/Adventure";
import EndState from "./components/EndStatePage/EndState";
import Root from "./components/Root/Root";
import DeathScreen from "./components/DeathScreen/DeathScreen";

import "./App.css";
import ThemeProvider from "react-bootstrap/ThemeProvider";

function App() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [authSwitch, setAuthSwitch] = useState(true);

  const navigate = useNavigate();

  const handleLoginSubmit = async (creds) => {
    const config = {
      method: "POST",
      body: JSON.stringify(creds),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const r = await fetch("/login", config);
    const userData = await r.json();
    if (r.ok) {
      dispatch(setUser(JSON.stringify(userData)));
      navigate("/homepage");
    } else {
      const { errors } = userData;
      setErrors([...errors]);
      setTimeout(() => {
        setErrors([]);
      }, 5000);
    }
  };

  const handleSignUpSubmit = async (creds) => {
    const config = {
      method: "POST",
      body: JSON.stringify(creds),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const r = await fetch("/signup", config);
    const userData = await r.json();
    if (r.ok) {
      dispatch(setUser(JSON.stringify(userData)));
      navigate("/homepage");
    } else {
      const { errors } = userData;
      setErrors([...errors]);
      setTimeout(() => {
        setErrors([]);
      }, 5000);
    }
  };

  const handleLogout = async () => {
    const config = {
      method: "DELETE",
    };
    fetch("/logout", config)
      .then((r) => r.text())
      .then((res) => {
        console.log(res);
        localStorage.clear();
        navigate("/auth");
      });
  };

  const errorMessage = () => {
    if (errors) {
      return errors.map((e, i) => {
        return (
          <h1 style={{ color: "red" }} key={i}>
            {e}
          </h1>
        );
      });
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("user_data")) {
      navigate("/auth");
    } else {
      dispatch(setUser(localStorage.getItem("user_data")));
      navigate("/homepage");
    }
  }, []);

  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <div className="App">
        <Routes>
          <Route path="/" element={<Root />} />
          <Route
            path="/auth"
            element={
              authSwitch ? (
                <Login
                  onLogin={handleLoginSubmit}
                  errorMessage={errorMessage}
                  setAuth={setAuthSwitch}
                />
              ) : (
                <SignUp
                  onSignUp={handleSignUpSubmit}
                  errorMessage={errorMessage}
                  setAuth={setAuthSwitch}
                />
              )
            }
          />
          <Route
            path="/homepage"
            element={<UserHomePage logout={handleLogout} />}
          />
          <Route path="/background" element={<Background />} />
          <Route path="/adventure-start" element={<Adventure />} />
          <Route path="/storyline" element={<Storyline />} />
          <Route path="/death" element={<DeathScreen />} />
          <Route path="/endstate" element={<EndState />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
