import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, Input, Button} from "@mui/material";
import './Signup.css'

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    bio: "",
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const { username, password, bio, avatar } = formData;

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          navigate(`/login`);
        });
      } else {
        res.json().then((json) => setErrors(Object.entries(json.errors)));
      }
    });
    setFormData({
      avatar: "",
      username: "",
      password: "",
      bio: "",
    });
  }

  return (
    <div className="signup">
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <FormControl>
        <Input
            placeholder="Avatar"
            type="text"
            name="avatar"
            value={avatar}
            onChange={handleChange}
          />
          <Input
            placeholder="Username"
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <Input
            placeholder="Bio"
            type="text"
            minRows="3"
            multiline={true}
            name="bio"
            value={bio}
            onChange={handleChange}
          />
          <Button type="submit">Signup!</Button>
        </FormControl>
      </form>
      {errors
        ? errors.map((error) => (
            <div>
              {" "}
              {/* {error[0]}  */}
              {error[1]}{" "}
            </div>
          ))
        : null}
      <Button onClick={() => navigate("/")}>Back</Button>
    </div>
  );
}

export default SignUp;
