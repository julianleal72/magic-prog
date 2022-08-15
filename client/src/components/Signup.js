import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, Input, Button, TextField } from "@mui/material";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    bio: "",
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const { username, password, bio } = formData;

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
      username: "",
      password: "",
      bio: "",
    });
  }

  return (
    <>
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <FormControl>
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
              {error[0]} {error[1]}{" "}
            </div>
          ))
        : null}
    </>
  );
}

export default SignUp;
