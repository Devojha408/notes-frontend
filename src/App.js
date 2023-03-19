import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/home";
import AllNotes from "./components/notelist";
import UpdateNote from "./components/updatenote";
import AddNote from "./components/addnote";
import './App.css';
import { Container } from "reactstrap";
import NotFound from "./components/notfound";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <Container>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {currentUser && (
              <li className="nav-item">
                <Link to={"/private"} className="nav-link">
                  Private
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/notes"} className="nav-link">
                  All Notes
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to="/addnote" className="nav-link">
                  Create Note
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/login" className="nav-link" onClick={logOut}>
                  Logout
                </Link>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/signup"} className="nav-link">
                  Sign up
                </Link>
              </li>
            </div>
          )}
        </nav>


        <div className="container mt-3">
          <center>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/notes" element={<AllNotes />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/noteupdate" element={<UpdateNote />} />
              <Route path="/addnote" element={<AddNote />} />
              <Route path="/private" element={<Profile />} />
              <Route path="*" element={<NotFound />} />

            </Routes>
          </center>
        </div>
      </Container>
    </div>
  );
}

export default App;