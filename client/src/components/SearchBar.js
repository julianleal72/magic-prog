import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import { Select, Input, FormGroup } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import "./SearchBar.css"

function SearchBar({ setDisplayedCards, condensedCollection, displayedCards }) {
  const [type, setType] = useState("All");
  const [subtype, setSubType] = useState("All");

  function handleSearchByName(e) {
    e.preventDefault();
    let toSet = condensedCollection.filter((card) =>
      card.printing.info.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    setDisplayedCards(toSet);
  }
  function handleSearchByText(e) {
    e.preventDefault();
    let toSet = condensedCollection.filter((card) => {
      if ("text" in card.printing.info) {
        return card.printing.info.text
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      } else return false;
    });
    setDisplayedCards(toSet);
  }
  
  function handleSearchByType(e) {
    e.preventDefault();
    setType(e.target.value);
    console.log(e.target.value);
    let toSet = condensedCollection;
    if (e.target.value !== "All") {
      toSet = condensedCollection.filter((card) =>
        card.printing.info.type
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
    }
    setDisplayedCards(toSet);
  }

  function handleSearchBySubType(e) {
    setSubType(e.target.value);
    console.log(e.target.value);
    let toSet = [
      ...condensedCollection.filter((card) =>
        card.printing.info.type.toLowerCase().includes(type.toLowerCase())
      ),
    ];
    console.log(toSet);
    if (e.target.value !== "All") {
      toSet = toSet.filter((card) =>
        card.printing.info.type
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
    }
    setDisplayedCards(toSet);
  }

  return (
    <div className="searchBar">
      <div className="searchChild1">
        <FormControl sx={{ width: 280, padding: 0.8 }}>
          <InputLabel>Search by card name</InputLabel>
          <Input
            name="name"
            sx={{ padding: 0.5 }}
            onChange={handleSearchByName}
          />
        </FormControl>
      </div>

      <div className="searchChild2">
        <FormControl sx={{ width: 280, padding: 0.8 }}>
          <InputLabel>Search by card type</InputLabel>
          <Select
            sx={{ padding: 0.5 }}
            name="type"
            onChange={handleSearchByType}
            label={"Search by card/creature type"}
            defaultValue={type}
            value={type}
            size="small"
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"Artifact"}>Artifact</MenuItem>
            <MenuItem value={"Creature"}>Creature</MenuItem>
            <MenuItem value={"Enchantment"}>Enchantment</MenuItem>
            <MenuItem value={"Instant"}>Instant</MenuItem>
            <MenuItem value={"Land"}>Land</MenuItem>
            <MenuItem value={"Planeswalker"}>Planeswalker</MenuItem>
            <MenuItem value={"Sorcery"}>Sorcery</MenuItem>
          </Select>
        </FormControl>
        {type === "Creature" ? (
          <FormControl sx={{ width: 200, padding: 0.8, bottom:8 }}>
            <InputLabel>Search by creature type</InputLabel>
            <Input
              name="subtype"
              sx={{ padding: 0.5 }}
              onChange={handleSearchBySubType}
            />
          </FormControl>
        ) : null}
        {type === "Enchantment" ? (
          <FormControl sx={{ width: 200, padding: 0.8 }}>
            <InputLabel>Search by card subtype</InputLabel>
            <Select
              sx={{ padding: 0.5 }}
              name="subtype"
              onChange={handleSearchBySubType}
              label={"Search by subtype"}
              value={subtype}
              defaultValue={subtype}
              size="small"
            >
              <MenuItem value={"All"}>---</MenuItem>
              <MenuItem value={"Aura"}>Aura</MenuItem>
              <MenuItem value={"Background"}>Background</MenuItem>
              <MenuItem value={"Cartouche"}>Cartouche</MenuItem>
              <MenuItem value={"Class"}>Class</MenuItem>
              <MenuItem value={"Curse"}>Curse</MenuItem>
              <MenuItem value={"Rune"}>Rune</MenuItem>
              <MenuItem value={"Saga"}>Saga</MenuItem>
              <MenuItem value={"Shrine"}>Shrine</MenuItem>
            </Select>
          </FormControl>
        ) : null}
        {type === "Artifact" ? (
          <FormControl sx={{ width: 250, padding: 0.8 }}>
            <InputLabel>Search by card subtype</InputLabel>
            <Select
              sx={{ padding: 0.5 }}
              name="subtype"
              onChange={handleSearchBySubType}
              label={"Search by subtype"}
              value={subtype}
              defaultValue={subtype}
              size="small"
            >
              <MenuItem value={"All"}>---</MenuItem>
              <MenuItem value={"Contraption"}>Contraption</MenuItem>
              <MenuItem value={"Equipment"}>Equipment</MenuItem>
              <MenuItem value={"Fortification"}>Fortification</MenuItem>
              <MenuItem value={"Vehicle"}>Vehicle</MenuItem>
            </Select>
          </FormControl>
        ) : null}
        {type === "Land" ? (
          <FormControl sx={{ width: 250, padding: 0.8 }}>
            <InputLabel>Search by card subtype</InputLabel>
            <Select
              sx={{ padding: 0.5 }}
              name="subtype"
              onChange={handleSearchBySubType}
              label={"Search by subtype"}
              value={subtype}
              defaultValue={subtype}
              size="small"
            >
              <MenuItem value={"All"}>---</MenuItem>
              <MenuItem value={"Basic"}>Basic</MenuItem>
              <MenuItem value={"Desert"}>Desert</MenuItem>
              <MenuItem value={"Gate"}>Gate</MenuItem>
              <MenuItem value={"Lair"}>Lair</MenuItem>
              <MenuItem value={"Locus"}>Locus</MenuItem>
            </Select>
          </FormControl>
        ) : null}
        {type === "Instant" || type === "Sorcery" ? (
          <FormControl sx={{ width: 250, padding: 0.8 }}>
            <InputLabel>Search by card subtype</InputLabel>
            <Select
              sx={{ padding: 0.5 }}
              name="subtype"
              onChange={handleSearchBySubType}
              label={"Search by subtype"}
              defaultValue={subtype}
              value={subtype}
              size="small"
            >
              <MenuItem value={"All"}>---</MenuItem>
              <MenuItem value={"Adventure"}>Adventure</MenuItem>
              <MenuItem value={"Arcane"}>Arcane</MenuItem>
              <MenuItem value={"Lesson"}>Lesson</MenuItem>
              {type === "Instant" ?
              <MenuItem value={"Trap"}>Trap</MenuItem> : null}
            </Select>
          </FormControl>
        ) : null}
      </div>

      <div className="searchChild3">
        <FormControl sx={{ width: 280, padding: 0.8 }}>
          <InputLabel>Search by card text</InputLabel>
          <Input
            sx={{ padding: 0.5 }}
            name="text"
            onChange={handleSearchByText}
          />
        </FormControl>
      </div>
    </div>
  );
}

export default SearchBar;
