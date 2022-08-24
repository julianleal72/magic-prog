import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  Button,
  OutlinedInput,
  MenuItem,
  Select,
} from "@mui/material";
import { GiStamper } from "react-icons/gi";

function DeckHeader({ deck, setDeck, setShowHeader }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState([]);
  console.log(deck);

  useEffect(() => {
    let starterFormData = deck;
    console.log(starterFormData);
    setFormData(starterFormData);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    fetch(`/decks/${deck.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((deck) => {
          console.log(deck);
          setDeck(deck);
          setShowHeader(false);
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
  }

  return (
    <div>
      {errors ? errors.map((e) => <div key={e[0]}>{e[1]}</div>) : null}
      <FormControl sx={{ width: 370 }}>
        <FormControl sx={{ padding: 0.8 }}>
          <InputLabel>Deck Icon:</InputLabel>
          <OutlinedInput
            sx={{ padding: 0.5 }}
            type="text"
            name="icon"
            label="Icon"
            placeholder={"Deck Icon..."}
            value={formData.icon}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl sx={{ padding: 0.8 }}>
          <InputLabel>Deck Name:</InputLabel>
          <OutlinedInput
            sx={{ padding: 0.5 }}
            type="text"
            name="name"
            label="Name"
            placeholder={"Deck Name..."}
            value={formData.name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl sx={{ padding: 0.8 }}>
          <InputLabel>Format:</InputLabel>
          <Select
            type="text"
            defaultValue={{...deck}.format}
            value={formData.format}
            sx={{ padding: 0.5, autoWidth:true }}
            label="Format"
            name="format"
            onChange={handleChange}
          >
            <MenuItem sx={{ width: 200 }} value="Freeform">
              Freeform
            </MenuItem>
            <MenuItem sx={{ width: 200 }} value="Eternal">
              Eternal
            </MenuItem>
            <MenuItem sx={{ width: 200 }} value="Progression">
              Progression
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ padding: 0.8 }}>
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
        <Button
          variant="contained"
          color="primary"
          startIcon={<GiStamper />}
          onClick={handleSubmit}
        >
          Update Deck Details
        </Button>
      </FormControl>
    </div>
  );
}

export default DeckHeader;
