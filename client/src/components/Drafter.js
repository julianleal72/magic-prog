import { useEffect, useState } from "react";
import SetTile from "./SetTile.js";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import "./Drafter.css";
import { Link } from "react-router-dom";
import DraftSlider from "./DraftSlider.js";
import { GiStarSwirl } from "react-icons/gi";

function Drafter({ user, sets, setSets, fixins }) {
  const [currentFilter, setCurrentFilter] = useState("code");
  const [chosenSet, setChosenSet] = useState(sets[0]);
  const [chosenFixin, setChosenFixin] = useState(
    fixins.find((element) => element.code === chosenSet.code)
  );
  const [numPacks, setNumPacks] = useState(3);
  const [collection, setCollection] = useState("");
  const dummy = {
    symbol: "https://cdn-icons-png.flaticon.com/512/580/580185.png",
    booster: "https://c1.scryfall.com/file/scryfall-card-backs/large/59/597b79b3-7d77-4261-871a-60dd17403388.jpg?1561757712", 
    code: ""
  }
  useEffect(() => {
    console.log(sets);
    handleSort(currentFilter);
    setChosenSet(sets[0]);
  }, []);

  function handleChange(e) {
    let set = sets.find((element) => element.code === e.target.value);
    let fixin = fixins.find((element) => element.code === set.code)
    console.log(fixin)
    setChosenFixin(fixin ? fixin : dummy);
    setChosenSet(set);
  }
  function handleCollectChange(e) {
    setCollection(e.target.value);
    console.log(collection);
  }

  function handleFilter(e) {
    setCurrentFilter(e.target.value);
    handleSort(e.target.value);
    //console.log(currentFilter);
  }
  function handleSort(filter) {
    // console.log(filter)
    let toSet = [...sets];
    if (filter === "code") {
      toSet.sort((a, b) => (a.code > b.code ? 1 : -1));
    }
    if (filter === "name") {
      toSet.sort((a, b) => (a.name > b.name ? 1 : -1));
    }
    if (filter.includes("chron")) {
      toSet.sort((a, b) => (a.release > b.release ? 1 : -1));
      if (filter.includes("desc")) {
        toSet.reverse();
      }
    }
    setSets(toSet);
    //console.log(sets);
  }

  return (
    <div>
      <div className="wrapperD">
        <div className="leftSideD">
          <FormControl sx={{ width: 400 }}>
            <FormControl sx={{ padding: 0.8 }} size="small">
              <InputLabel>Set:</InputLabel>
              <Select
                sx={{ padding: 0.5 }}
                onChange={handleChange}
                value={chosenSet.code}
                label="Set"
              >
                {sets.map((set) => (
                  <MenuItem value={set.code}>
                    {set.name} - {set.code}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ padding: 0.8, width: "400px" }} size="small">
              <InputLabel>Sort by:</InputLabel>
              <Select
                sx={{ padding: 0.5 }}
                label="Sort by"
                value={currentFilter}
                defaultValue="Alphabetical by Set Code"
                onChange={(e) => handleFilter(e)}
              >
                <MenuItem value="code">Alphabetical by Set Code</MenuItem>
                <MenuItem value="name">Alphabetical by Set Name</MenuItem>
                <MenuItem value="chron asc">Chronological Ascending</MenuItem>
                <MenuItem value="chron desc">Chronological Descending</MenuItem>
              </Select>
            </FormControl>
          </FormControl>
            <FormControl sx={{ padding: 0.8, width:400 }} size="small">
              <InputLabel>Collection to add to:</InputLabel>
              <Select
                label="Collection to add to:"
                onChange={handleCollectChange}
                sx={{ padding: 0.5, width: 400 }}
              >
                {user.collections.map((collection) => (
                  <MenuItem key={collection.id} value={collection.id}>
                    {collection.title}
                  </MenuItem>
                ))}
              </Select>
              <br/>
            </FormControl>
            <DraftSlider numPacks={numPacks} setNumPacks={setNumPacks} />
            <br />
            <Link
              to="/packopener"
              state={{
                numPacks: { numPacks },
                set: { chosenSet },
                collection: { collection },
                fixin: {chosenFixin}
              }}
            >
              <Button
                variant="contained"
                color="success"
                startIcon={<GiStarSwirl />}
                endIcon={<GiStarSwirl />}
              >
                Draft!
              </Button>
            </Link>
        </div>
        <div className="rightSideD">
          {chosenSet ? (
            <SetTile set={chosenSet} user={user} fixin={chosenFixin} />
          ) : null}
        </div>
        <br />
        <br />
      </div>
    </div>
  );
}

export default Drafter;
