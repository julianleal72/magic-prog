import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((client) => {
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
      console.log(user)
    }
  
    function handleLogout() {
      navigate("/");
      setUser(null);
      console.log(null)
    }

    function deleteUser() {
      setUser(null);
      navigate("/");
    }

    function updateUser(updatedUser) {
      setUser(updatedUser)
    }

  return (
    <BrowserRouter>
      <div className="App">
      <Header user={user} onLogout={handleLogout} />
      {user ? <UserNav/> : null}
        <Routes>
          <Route path = "/testing" element = {<h1>Test Route</h1>}/>
          <Route path ="/" element={<h1>Page Count: {count}</h1>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
