import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, OutlinedInput, InputLabel } from "@mui/material";
import "./User.css";

function UserEditForm({ user, updateUser }) {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { avatar, username, bio, password } = user;
  let starterFormData = {
    avatar: avatar,
    username: username,
    password: password,
    bio: bio,
  };
  const [formData, setFormData] = useState(starterFormData);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then(updateUser);
        navigate("/");
      } else {
        res
          .json()
          .then((data) =>
            setErrors(Object.entries(data.errors).map((e) => `${e[0]} ${e[1]}`))
          );
      }
    });
    navigate(`/`);
  }

  function handleChange(e) {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  function goBack(e) {
    e.preventDefault();
    navigate(`/user`);
  }

  return (
    <div className="card">
      {errors ? errors.map((e) => <div key={e[0]}>{e[1]}</div>) : null}
      {avatar ? (
        <img src={formData.avatar} alt="avatar pic" className="avatar-pic" />
      ) : null}
      <br />
      <FormControl  className="userEditForm">
      <FormControl>
        <InputLabel className="label">Avatar: </InputLabel>
        <OutlinedInput
        className="input"
          type="text"
          name="avatar"
          placeholder={avatar}
          value={formData.avatar}
          onChange={handleChange}
        />
    </FormControl>
    <FormControl>
        <InputLabel className="label" shrink={true}>Username: </InputLabel>
        <OutlinedInput
        className="input"
          type="text"
          name="username"
          placeholder={username}
          value={formData.username}
          onChange={handleChange}
        />
    </FormControl>
    <FormControl>
        <InputLabel className="label" shrink={true}>Password:</InputLabel>
        <OutlinedInput
        className="input"
          type="password"
          name="password"
          placeholder={"Input your old password or choose a new one carefully"}
          value={formData.password}
          onChange={handleChange}
        />
    </FormControl>
    <FormControl>
        <InputLabel className="label" shrink={true}>About Me:</InputLabel>
        <OutlinedInput className="input"
          type="text"
          name="bio"
          minRows="3"
          multiline={true}
          placeholder={bio}
          value={formData.bio}
          onChange={handleChange}
        />
    </FormControl>
        <Button className="saveButton" variant="contained" color="secondary" onClick={handleSubmit}>
          Save
        </Button>
      </FormControl>
      {errors
        ? errors.map((e) => <h2 style={{ color: "red" }}>{e.toUpperCase()}</h2>)
        : null}
    </div>
  );
}

export default UserEditForm;
