import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Alert, Box } from "@mui/material";
import { styled } from "@mui/styles";
import "./User.css";
import { FiEdit3 } from "react-icons/fi";
import DeleteIcon from '@mui/icons-material/Delete';
import {RiEmotionHappyLine, RiEmotionUnhappyLine} from "react-icons/ri"


function User({ user, deleteUser }) {
  const [errors, setErrors] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const [alert, setAlert] = useState(false);

  const MyButton = styled(Button)({
    color: "red",
  });

  const MySecondButton = styled(Button)({
    color: "green",
  });

  function handleDelete() {
    fetch(`/users/${user.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.ok) {
        deleteUser(params.id);
        navigate("/");
      } else {
        res
          .json()
          .then((data) =>
            setErrors(Object.entries(data.errors).map((e) => `${e[0]} ${e[1]}`))
          );
      }
    });
  }

  function deleteAlert() {
    setAlert(true);
  }

  function undoDelete() {
    setAlert(false);
  }

  if (errors) return <h1>{errors}</h1>;

  let userScreen;
  if (user) {
    const { avatar, username, password, bio } = user;
    userScreen = (
      <div>
        <CardContent className="card-content">
          <img src={avatar} alt="avatar pic" className="avatar-pic" />
          <Typography
            className="card-desc"
            variant="subtitle1"
          >{`${username}`}</Typography>
          <Typography
            className="card-desc"
            variant="body1"
            color="text.secondary"
          >{`${bio}`}</Typography>

          <IconButton className="editButton">
            <Link to={`/user/edit`}>
              <FiEdit3 className="icon"/>
            </Link>
          </IconButton>

          <MyButton variant = "outlined" className = "delete" onClick={deleteAlert} startIcon={<DeleteIcon />} color="error">Delete user</MyButton>
          {alert ? (
            <Alert className="alert"
              severity="warning"
              action={
                <div className="alertMessage">
                  <MySecondButton variant = "outlined" onClick={undoDelete} color="success" startIcon = {<RiEmotionHappyLine/>}>
                    Keep my Profile
                  </MySecondButton>
                  <MyButton onClick={handleDelete} variant = "outlined" endIcon={<RiEmotionUnhappyLine />} color="error">Delete my Profile</MyButton>
                </div>
              }
            >
              Are you sure you want to delete your profile?
            </Alert>
          ) : null}
        </CardContent>
      </div>
    );
  } else {
    userScreen = (
      <div>
        <h3>Whoops, No One Is Home.</h3>
        <Link to="/">Take This, It's Dangerous To Go Alone</Link>
      </div>
    );
  }

  return (
    <div className="container-bio">
      <Card id="bio-card">{userScreen}</Card>
    </div>
  );
}

export default User;
