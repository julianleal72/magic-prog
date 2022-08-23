import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select, MenuItem, Menu
} from "@mui/material";

import {GiBoltSpellCast, GiFireSpellCast, GiIceSpellCast} from "react-icons/gi"

function NewDeckC({ user }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const collection = location.state.collection;

  const spells = [<GiBoltSpellCast/>, <GiFireSpellCast/>, <GiIceSpellCast/>]

  useEffect(() => {
    let starterFormData = {
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
  function randomSpellCast(){
    return spells[Math.floor(random(1, 3))-1]
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
      <FormControl>
        <InputLabel>Deck Name:</InputLabel>
        <OutlinedInput
          type="text"
          name="name"
          placeholder="Deck Name..."
          label="Name"
          value={formData.name}
          onChange={handleChange}
        />
        </FormControl>
        <FormControl>
        <InputLabel>Format:</InputLabel>
        <Select
          type="text"
          value={formData.format}
          label="format"
          name="format"
          onChange={handleChange}
        >
          <MenuItem value="Freeform">Freeform</MenuItem>
          <MenuItem value="Eternal">Eternal</MenuItem>
          <MenuItem value="Progression">Progression</MenuItem>
        </Select>
        </FormControl>
        <FormControl>
        <InputLabel>Description:</InputLabel>
        <OutlinedInput
          name="description"
          minRows="2"
          label="Description"
          placeholder="Deck Description..."
          multiline={true}
          value={formData.description}
          onChange={handleChange}
        /></FormControl>
        {/* <div>
        <label>Collection to add to:</label>
        <select onChange={handleChange} name="collection_id">
          {user.collections.map((collection) => (
            <option key={collection.id} value={collection.id}>
              {collection.title}
            </option>
          ))}
        </select></div> */}
        <Button variant="contained" onClick={handleSubmit} startIcon={randomSpellCast()}>
          Create Deck!
        </Button>
      </FormControl>
    </div>
  );
}

export default NewDeckC;
