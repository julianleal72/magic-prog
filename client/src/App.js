import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import UserNav from "./components/UserNav";
import Header from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Drafter from "./components/Drafter";
import PackOpener from "./components/PackOpener";
import { makeObservable, observable, computed, action, flow } from "mobx"

class UserStore{

  id = 0;
  username = "";
  bio = "";

  constructor(){
    makeObservable(this,{
      id: observable,
      username: observable,
      bio: observable//,
      //avatar: observable
    })
  }
}
// const App = observer(({user}) => {
function App() {
  const navigate = useNavigate();
  const userStore = new UserStore();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((client) => {
          userStore.
          setUser(client);
          console.log(client);
        });
      } else {
        console.log("We're not rendering nothing pal");
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
    <div className="App">
      <Header user={user} onLogout={handleLogout} />
      {user ? <UserNav /> : null}
      <Routes>
        <Route exact path="/" element={<Drafter/>} />
        <Route path="/packopener" element={<PackOpener/>}/>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
