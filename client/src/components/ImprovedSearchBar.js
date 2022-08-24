import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import { yellow, blue, purple, red, green } from "@mui/material/colors";
import { Select, Input, FormGroup } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import "./SearchBar.css";

function SearchBar({ setDisplayedCards, condensedCollection, displayedCards }) {
  const [whiteChecked, setWhiteChecked] = useState(false);
  const [blueChecked, setBlueChecked] = useState(false);
  const [blackChecked, setBlackChecked] = useState(false);
  const [redChecked, setRedChecked] = useState(false);
  const [greenChecked, setGreenChecked] = useState(false);
  const [type, setType] = useState("All");
  const [subtype, setSubType] = useState("All");
  const [cardName, setCardName] = useState("");
  const [cardText, setCardText] = useState("");

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

  //   function handleSearchByType(e) {
  //     e.preventDefault();
  //     setType(e.target.value);
  //     console.log(e.target.value);
  //     let toSet = condensedCollection;
  //     if (e.target.value !== "All") {
  //       toSet = condensedCollection.filter((card) =>
  //         card.printing.info.type
  //           .toLowerCase()
  //           .includes(e.target.value.toLowerCase())
  //       );
  //     }
  //     setDisplayedCards(toSet);
  //   }

  //   function handleSearchBySubType(e) {
  //     setSubType(e.target.value);
  //     console.log(e.target.value);
  //     let toSet = [
  //       ...condensedCollection.filter((card) =>
  //         card.printing.info.type.toLowerCase().includes(type.toLowerCase())
  //       ),
  //     ];
  //     console.log(toSet);
  //     if (e.target.value !== "All") {
  //       toSet = toSet.filter((card) =>
  //         card.printing.info.type
  //           .toLowerCase()
  //           .includes(e.target.value.toLowerCase())
  //       );
  //     }
  //     setDisplayedCards(toSet);
  //   }

  function handleChange(e) {
    let { value, name } = e.target;
    console.log(name);
    console.log(value);
    if (name === "cardName") setCardName(value);
    if (name === "cardText") setCardText(value);
    if (name === "type") setType(value);
    if (name === "subtype") setSubType(value);
    grandSearch();
  }

  function grandSearch() {
    let toSet = [];

    if (type !== "All") {
      toSet = [
        ...condensedCollection.filter((card) =>
          card.printing.info.type.toLowerCase().includes(type.toLowerCase())
        ),
      ];
      if (subtype !== "All") {
        toSet = toSet.filter((card) =>
          card.printing.info.type.toLowerCase().includes(subtype.toLowerCase())
        );
      }
    }

    toSet = toSet.filter((card) =>
      card.printing.info.name.toLowerCase().includes(cardName.toLowerCase())
    );
    toSet = toSet.filter((card) => {
      if ("text" in card.printing.info) {
        return card.printing.info.text
          .toLowerCase()
          .includes(cardText.toLowerCase());
      } else return false;
    });
  }

  // function handleSearchByManaCost() {
  //   let toSet = [...condensedCollection];
  //   if (whiteChecked) {
  //     toSet = toSet.filter((card) => {
  //       if (card.printing.info.colors)
  //         card.printing.info.colors.includes("White");
  //       else return false;
  //     });
  //   }
  //   if (blueChecked) {
  //     toSet = toSet.filter((card) => {
  //       if (card.printing.info.colors)
  //         card.printing.info.colors.includes("Blue");
  //     });
  //   }
  //   if (blackChecked) {
  //     toSet = toSet.filter((card) => {
  //       if (card.printing.info.colors)
  //         card.printing.info.colors.includes("Black");
  //     });
  //   }
  //   if (redChecked) {
  //     toSet = toSet.filter((card) => {
  //       if (card.printing.info.colors)
  //         card.printing.info.colors.includes("Red");
  //     });
  //   }
  //   if (greenChecked) {
  //     toSet = toSet.filter((card) => {
  //       if (card.printing.info.colors)
  //         card.printing.info.colors.includes("Green");
  //     });
  //   }
  //   console.log(toSet);
  //   setDisplayedCards(toSet);
  // }

  return (
    <div className="searchBar">
      <div className="searchChild1">
        <FormControl sx={{ width: 280, padding: 0.8 }}>
          <InputLabel>Search by card name</InputLabel>
          <Input
            name="cardName"
            sx={{ padding: 0.5 }}
            onChange={handleChange}
            value={cardName}
          />
        </FormControl>
      </div>

      {/* <FormGroup>
          <Checkbox
            checked={whiteChecked}
            onClick={(e) => setWhiteChecked(e.target.checked)}
            sx={{
              color: yellow[400],
              "&.Mui-checked": {
                color: yellow[200],
              },
            }}
          />
          <Checkbox
            checked={blueChecked}
            onClick={(e) => setBlueChecked(e.target.checked)}
            sx={{
              color: blue[800],
              "&.Mui-checked": {
                color: blue[600],
              },
            }}
          />
          <Checkbox
            checked={blackChecked}
            onClick={(e) => setBlackChecked(e.target.checked)}
            sx={{
              color: purple[900],
              "&.Mui-checked": {
                color: purple[800],
              },
            }}
          />
          <Checkbox
            checked={redChecked}
            onClick={(e) => setRedChecked(e.target.checked)}
            sx={{
              color: red[600],
              "&.Mui-checked": {
                color: red[400],
              },
            }}
          />
          <Checkbox
            checked={greenChecked}
            onClick={(e) => setGreenChecked(e.target.checked)}
            sx={{
              color: green[900],
              "&.Mui-checked": {
                color: green[600],
              },
            }}
          />
        </FormGroup> */}

      <div className="searchChild2">
        <FormControl sx={{ width: 280, padding: 0.8 }}>
          <InputLabel>Search by card type</InputLabel>
          <Select
            sx={{ padding: 0.5 }}
            name="type"
            onChange={handleChange}
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
          <FormControl sx={{ width: 200, padding: 0.8 }}>
            <InputLabel>Search by creature type</InputLabel>
            <Input
              name="subtype"
              sx={{ padding: 0.5 }}
              onChange={handleChange}
            />
          </FormControl>
        ) : null}
        {type === "Enchantment" ? (
          <FormControl sx={{ width: 200, padding: 0.8 }}>
            <InputLabel>Search by card subtype</InputLabel>
            <Select
              sx={{ padding: 0.5 }}
              name="subtype"
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
              label={"Search by subtype"}
              defaultValue={subtype}
              value={subtype}
              size="small"
            >
              <MenuItem value={"All"}>---</MenuItem>
              <MenuItem value={"Adventure"}>Adventure</MenuItem>
              <MenuItem value={"Arcane"}>Arcane</MenuItem>
              <MenuItem value={"Lesson"}>Lesson</MenuItem>
              {type === "Instant" ? (
                <MenuItem value={"Trap"}>Trap</MenuItem>
              ) : null}
            </Select>
          </FormControl>
        ) : null}
      </div>

      <div className="searchChild3">
        <FormControl sx={{ width: 280, padding: 0.8 }}>
          <InputLabel>Search by card text</InputLabel>
          <Input
            sx={{ padding: 0.5 }}
            name="cardText"
            onChange={handleChange}
            value={cardText}
          />
        </FormControl>
      </div>
    </div>
  );
}

export default SearchBar;
