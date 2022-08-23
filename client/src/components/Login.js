import { useState } from "react";
import { FormControl, Input, Button, } from "@mui/material"
import { useNavigate, Link } from "react-router-dom";
import './Login.css'
import {GiPortal} from "react-icons/gi"

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([])

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => 
        {
          onLogin(user)
          navigate('/') //change to user
        })
      } else {
        r.json().then(json => setErrors(Object.entries(json.errors)))
      }
    });
  }

  return (
    <div>
      <h3>Greetings, Planeswalker!</h3>
      <form onSubmit={handleSubmit} className="form">
      <FormControl>
      <Input 
        placeholder="Username"
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        placeholder="Password" 
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <Button type="submit" sx={{color:"purple"}}>Enter <GiPortal size="40"/>
      </Button>
      <br />
    </FormControl>
      {errors?errors.map(e => <div key={e[0]}>{e[1]}</div>):null}
    <br />
    </form>
    <div>Don't have an account? <Link to="/signup">Sign Up</Link> to get started!</div>
    </div>
  );
}

export default Login;
