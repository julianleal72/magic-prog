import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Menu,
} from "@mui/material";
import "./NewForm.css";

import {
  GiBoltSpellCast,
  GiFireSpellCast,
  GiIceSpellCast,
  GiCardDiscard,
} from "react-icons/gi";

function NewDeckC({ user }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const collection = location.state.collection;

  const spells = [<GiBoltSpellCast />, <GiFireSpellCast />, <GiIceSpellCast />];

  useEffect(() => {
    let starterFormData = {
      icon: "",
      collection_id: location.state.collection.collection.id,
      name: "",
      format: "Freeform",
      description: "",
      cards: { array: [] },
    };
    console.log(starterFormData);
    setFormData(starterFormData);
  }, []);

  function random(mn, mx) {
    return Math.random() * (mx - mn) + mn;
  }
  function randomSpellCast() {
    return spells[Math.floor(random(1, 3)) - 1];
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    fetch("/decks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((d) => {
          console.log(d);
          navigate("/user/decks");
        });
      } else {
        r.json().then((json) => setErrors(Object.entries(json.errors)));
      }
    });
  }

  function goBack(e) {
    e.preventDefault();
    navigate(`/user/collections`);
  }

  function handleChange(e) {
    let { value, name } = e.target;
    if (name === "collection_id") {
      value = parseInt(value);
    }
    setFormData({ ...formData, [name]: value });
    console.log(value);
    console.log(formData);
  }

  return (
    <div>
      {errors ? errors.map((e) => <div key={e[0]}>{e[1]}</div>) : null}
      <FormControl className="newDeckForm">
        <FormControl className="inputBox" sx={{ padding: 0.8 }}>
          <InputLabel>Deck Icon:</InputLabel>
          <OutlinedInput
            sx={{ padding: 0.5 }}
            type="text"
            name="icon"
            placeholder="Deck Icon..."
            label="Icon"
            value={formData.icon}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl className="inputBox" sx={{ padding: 0.8 }}>
          <InputLabel>Deck Name:</InputLabel>
          <OutlinedInput
            sx={{ padding: 0.5 }}
            type="text"
            name="name"
            placeholder="Deck Name..."
            label="Name"
            value={formData.name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl className="inputBox" sx={{ padding: 0.8 }}>
          <InputLabel>Format:</InputLabel>
          <Select
            sx={{ padding: 0.5 }}
            type="text"
            value={formData.format}
            label="Format"
            name="format"
            onChange={handleChange}
          >
            <MenuItem value="Freeform">Freeform</MenuItem>
            <MenuItem value="Eternal">Eternal</MenuItem>
            <MenuItem value="Progression">Progression</MenuItem>
          </Select>
        </FormControl>
        <FormControl className="inputBox" sx={{ padding: 0.8 }}>
          <InputLabel>Description:</InputLabel>
          <OutlinedInput
            sx={{ padding: 0.5 }}
            name="description"
            minRows="3"
            label="Description"
            placeholder="Deck Description..."
            multiline={true}
            value={formData.description}
            onChange={handleChange}
          />
        </FormControl>
        {/* <div>
        <label>Collection to add to:</label>
        <select onChange={handleChange} name="collection_id">
          {user.collections.map((collection) => (
            <option key={collection.id} value={collection.id}>
              {collection.title}
            </option>
          ))}
        </select></div> */}
        <div className="buttonDiv">
          <Button
            variant="contained"
            className="butt"
            onClick={handleSubmit}
            startIcon={randomSpellCast()}
          >
            Create Deck!
          </Button>
          <Button
            variant="contained"
            color="error"
            className="butt"
            startIcon={<GiCardDiscard />}
            onClick={(e) => goBack(e)}
          >
            Discard Deck
          </Button>
        </div>
      </FormControl>
    </div>
  );
}

export default NewDeckC;
