import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, OutlinedInput, InputLabel } from "@mui/material";
import "./User.css";
import {
  GiPerspectiveDiceSixFacesSix,
} from "react-icons/gi";

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
        navigate("/user");
      } else {
        res
          .json()
          .then((data) =>
            setErrors(Object.entries(data.errors).map((e) => `${e[0]} ${e[1]}`))
          );
      }
    });
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
      {errors
        ? errors.map((e) => <h2 style={{ color: "red" }}>{e.toUpperCase()}</h2>)
        : null}
      <FormControl  className="userEditForm">
      <FormControl sx={{ padding: 0.8 }}>
        <InputLabel>Avatar:</InputLabel>
        <OutlinedInput sx={{ padding: 0.5 }}
          type="text"
          name="avatar"
          placeholder={avatar}
          value={formData.avatar}
          onChange={handleChange}
        />
    </FormControl>
    <FormControl sx={{ padding: 0.8 }}>
        <InputLabel>Username:</InputLabel>
        <OutlinedInput sx={{ padding: 0.5 }}
          type="text"
          name="username"
          label="Username"
          placeholder={username}
          value={formData.username}
          onChange={handleChange}
        />
    </FormControl>
    <FormControl sx={{ padding: 0.8 }}>
        <InputLabel>Password:</InputLabel>
        <OutlinedInput sx={{ padding: 0.5 }}
          type="password"
          name="password"
          label="P@s$w0Rd"
          placeholder={"Input your old password or choose a new one carefully"}
          value={formData.password}
          onChange={handleChange}
        />
    </FormControl>
    <FormControl sx={{padding:0.8}}>
        <InputLabel>About Me:</InputLabel>
        <OutlinedInput sx={{ padding: 0.5 }}
          type="text"
          name="bio"
          label="Bio"
          minRows="3"
          multiline={true}
          placeholder={bio}
          value={formData.bio}
          onChange={handleChange}
        />
    </FormControl>
        <Button className="saveButton"                 variant="contained"
                sx={{ background: "purple" }}
                startIcon={<GiPerspectiveDiceSixFacesSix />} onClick={handleSubmit}>
          Save
        </Button>
      </FormControl>
    </div>
  );
}

export default UserEditForm;
