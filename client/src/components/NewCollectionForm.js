import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import "./NewForm.css";
import {
  GiBoltSpellCast,
  GiFireSpellCast,
  GiIceSpellCast,
  GiCardDiscard,
} from "react-icons/gi";

function NewCollectionForm({ user, setUser, drafter }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({});
  const [reload, setReload] = useState(false);

  const spells = [<GiBoltSpellCast />, <GiFireSpellCast />, <GiIceSpellCast />];

  useEffect(() => {
    let starterFormData = {
      user_id: user ? user.id : 0,
      title: "",
      description: "",
      icon: "",
    };
    setFormData(starterFormData);
    console.log("wereloaded");
  }, [reload]);

  function random(mn, mx) {
    return Math.random() * (mx - mn) + mn;
  }
  function randomSpellCast() {
    return spells[Math.floor(random(1, 3)) - 1];
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/collections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((collection) => {
          console.log(collection);
          let temp={...user}
          // let col = user.collections
          // col.push(collection)
          temp["collections"] = [...user.collections, collection]
          setUser(temp)
          if (!drafter) navigate(`/user/collections`);
          else setReload(!reload);
        });
      } else {
        r.json().then((json) => setErrors(Object.entries(json.errors)));
      }
    });
  }

  function goBack(e) {
    e.preventDefault();
    if (!drafter) navigate(`/user/collections`);
  }

  function handleChange(e) {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <div className="card">
      {errors ? errors.map((e) => <div key={e[0]}>{e[1]}</div>) : null}
      {user ? (
        <div>
          <FormControl className="newCollectionForm">
            <FormControl className="inputBox" sx={{ padding: 0.8 }}>
              <InputLabel>Collection Icon:</InputLabel>
              <OutlinedInput
                sx={{ padding: 0.5 }}
                type="text"
                name="icon"
                placeholder="Collection Icon..."
                label="Icon"
                value={formData.icon}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl className="inputBox" sx={{ padding: 0.8 }}>
              <InputLabel>Title:</InputLabel>
              <OutlinedInput
                sx={{ padding: 0.5 }}
                type="text"
                name="title"
                placeholder="Collection Title..."
                label="Title"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl className="inputBox" sx={{ padding: 0.8 }}>
              <InputLabel>Description</InputLabel>
              <OutlinedInput
                sx={{ padding: 0.5 }}
                name="description"
                minRows="3"
                multiline={true}
                placeholder="Collection Description..."
                label="Description"
                onChange={handleChange}
              />
            </FormControl>
            <div className="buttonDivC">
              <Button
                className="butt"
                variant="contained"
                onClick={handleSubmit}
                startIcon={randomSpellCast()}
              >
                Create Collection!
              </Button>
              <br />
              {drafter ? null : (
                <Button
                  className="butt"
                  variant="contained"
                  color="error"
                  startIcon={<GiCardDiscard />}
                  onClick={(e) => goBack(e)}
                >
                  Discard Collection
                </Button>
              )}
            </div>
          </FormControl>
        </div>
      ) : (
        <div>Please login to create a collection</div>
      )}
    </div>
  );
}

export default NewCollectionForm;
