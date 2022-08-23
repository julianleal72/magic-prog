import { useState, useEffect } from "react";
import { FormControl, InputLabel, Button, OutlinedInput } from "@mui/material";
import { GiStamper } from "react-icons/gi";

function CollectionHeader({ collection, setShowHeader, setCollection }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState([]);
  const { title, description, icon } = collection;

  useEffect(() => {
    let starterFormData = {
      title: title,
      description: description,
      icon: icon,
    };
    console.log(starterFormData);
    setFormData(starterFormData);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    fetch(`/collections/${collection.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((collection) => {
          console.log(collection);
          setCollection(collection);
          setShowHeader(false);
        });
      } else {
        r.json().then((json) => setErrors(Object.entries(json.errors)));
      }
    });
  }

  function handleChange(e) {
    let { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <div className="detailsForm">
      <br />
      {errors ? errors.map((e) => <div key={e[0]}>{e[1]}</div>) : null}
      <FormControl>
        <FormControl sx={{padding:0.8}}>
          <InputLabel>Collection Icon:</InputLabel>
          <OutlinedInput sx={{padding:0.5}}
            type="text"
            name="icon"
            placeholder="Collection Icon..."
            label="Icon"
            value={formData.icon}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl sx={{padding:0.8}}>
          <InputLabel>Collection Title:</InputLabel>
          <OutlinedInput sx={{padding:0.5}}
            type="text"
            name="title"
            label="Title"
            placeholder={"Collection Title..."}
            value={formData.title}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl sx={{padding:0.8}}>
          <InputLabel>Description:</InputLabel>
          <OutlinedInput sx={{padding:0.5}}
            name="description"
            value={formData.description}
            onChange={handleChange}
            label="Description"
          />
        </FormControl>
        <br />
        <Button variant="contained" color="primary" startIcon={<GiStamper/>} onClick={handleSubmit}>
          Update Collection Details
        </Button>
      </FormControl>
    </div>
  );
}

export default CollectionHeader;
