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

function Drafter({ user, sets, setSets }) {
  const [currentFilter, setCurrentFilter] = useState("code");
  const [chosenSet, setChosenSet] = useState(sets[0]);
  const [numPacks, setNumPacks] = useState(3);
  const [collection, setCollection] = useState(
    parseInt(user.collections[0].id)
  );

  useEffect(() => {
    console.log(sets);
    handleSort(currentFilter);
  }, []);

  function handleChange(e) {
    let set = sets.find((element) => element.code === e.target.value);
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
      <div className="wrapper">
        <div className="leftSide">
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
            <FormControl sx={{ padding: 0.8 }} size="small">
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
        </div>
        <div className="rightSide">
          <div className="leftSideE">
            {chosenSet ? <SetTile set={chosenSet} user={user} /> : null}
          </div>
          <div className="rightSideE">
            <FormControl sx={{ padding: 0.8 }} size="small">
              <InputLabel>Collection to add to:</InputLabel>
              <Select
                label="Collection to add to:"
                onChange={handleCollectChange}
                sx={{ padding: 0.5, width: 240 }}
              >
                {user.collections.map((collection) => (
                  <MenuItem key={collection.id} value={collection.id}>
                    {collection.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <DraftSlider numPacks={numPacks} setNumPacks={setNumPacks} />
      <br />
      <br />
      <Button variant="contained" color="success">
        <Link
          to="/packopener"
          state={{
            numPacks: { numPacks },
            set: { chosenSet },
            collection: { collection },
          }}
        >
          Draft!
        </Link>
      </Button>
    </div>
  );
}

export default Drafter;
