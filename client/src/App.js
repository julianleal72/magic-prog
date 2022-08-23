import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import UserNav from "./components/UserNav";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Drafter from "./components/Drafter";
import PackOpener from "./components/PackOpener";
import User from "./components/User";
import UserEditForm from "./components/UserEditForm";
import Home from "./components/Home";
import UserCollections from "./components/UserCollections.js";
import NewCollectionForm from "./components/NewCollectionForm.js";
import CollectionInDepth from "./components/CollectionInDepth.js";
import DeckEdit from "./components/DeckEdit";
import DeckHeader from "./components/DeckHeader.js";
import UserDecks from "./components/UserDecks.js";
import NewDeckC from "./components/NewDeckC";
import "./App.css";
import PermaBanner from "./components/PermaBanner.js";
import PermaFooter from "./components/PermaFooter";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [sets, setSets] = useState([]);
  const [sets1, setSets1] = useState([]);
  const [sets2, setSets2] = useState([]);

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((client) => {
          setUser(client);
          console.log(client);
        });
      } else {
        console.log("Nope");
      }
    });
  }, []);

  function handleLogin(user) {
    setUser(user);
    console.log(user);
  }

  function handleLogout() {
    navigate("/");
    setUser(null);
    console.log(null);
  }

  function deleteUser() {
    setUser(null);
    navigate("/");
  }

  function updateUser(updatedUser) {
    setUser(updatedUser);
  }

  return (
    <div className="app">
      <PermaBanner/>
      {user ? <UserNav user={user} handleLogout={handleLogout} /> : null}
      <Routes>
        <Route exact path="/" element={<Home user={user} />} />
        <Route path="/drafter" element={<Drafter user={user} />} />
        <Route path="/packopener" element={<PackOpener />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/user"
          element={<User user={user} deleteUser={deleteUser} />}
        />
        <Route
          path="/user/edit"
          element={<UserEditForm user={user} updateUser={updateUser} />}
        />
        <Route
          path="/user/collections"
          element={<UserCollections user={user} />}
        />
        <Route
          path="/collections/new"
          element={<NewCollectionForm user={user} drafter={false} />}
        />
        <Route path="/user/collections/:id" element={<CollectionInDepth />} />
        <Route
          path="/decks/new"
          element={<DeckHeader user={user} meth={"POST"} />}
        />
        <Route path="/decks/newC" element={<NewDeckC user={user} />} />
        <Route path="/decks/edit/:id" element={<DeckEdit user={user} />} />
        <Route path="/user/decks" element={<UserDecks user={user} />} />
      </Routes>
      <PermaFooter/>
    </div>
  );
}

export default App;
