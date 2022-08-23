import { useEffect, useState } from "react";
import SetTile from "./SetTile.js";

function Drafter({ user }) {
  const [sets, setSets] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("code");
  const [chosenSet, setChosenSet] = useState({
    name: "Tenth Edition",
    code: "10E",
    release: "2007-07-13",
  });

  useEffect(() => {
    getSets()
  }, []);

  function getSets() {
    let setArr = [];
    fetch(`https://api.magicthegathering.io/v1/sets?page=1`)
      .then((r) => r.json())
      .then((r) => {
        r.sets.forEach((element) => {
          if (element.booster) {
            //sort by 3 character set code, sort by online, sort by product type (expansion, masters, supplemental, etc)
            setArr.push({
              name: element.name,
              code: element.code,
              release: element.releaseDate,
            });
          }
        });
        setSets([...sets].concat(setArr));
        handleSort("code")
      });
    fetch(`https://api.magicthegathering.io/v1/sets?page=2`)
      .then((r) => r.json())
      .then((r) => {
        r.sets.forEach((element) => {
          if (element.booster) {
            setArr.push({
              name: element.name,
              code: element.code,
              release: element.releaseDate,
            });
          }
        });
        setSets([...sets].concat(setArr))
      });
  }

  function handleChange(e) {
    let set = sets.find((element) => element.code === e.target.value);
    setChosenSet(set);
  }

  function handleFilter(e) {
    setCurrentFilter(e.target.value);
    handleSort(e.target.value);
    console.log(currentFilter);
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
    setSets([]);
    setSets(toSet);
    //console.log(sets);
  }

  return (
    <div>
      <label>Set:</label>
      <select onChange={handleChange}>
        {sets.map((set) => (
          <option key={set.code} value={set.code}>
            {set.name} - {set.code}
          </option>
        ))}
      </select>
      <label>Sort by:</label>
      <select onChange={(e) => handleFilter(e)}>
        <option value="code">Alphabetical by Set Code</option>
        <option value="name">Alphabetical by Set Name</option>
        <option value="chron asc">Chronological Ascending</option>
        <option value="chron desc">Chronological Descending</option>
      </select>
      <br />
      {chosenSet ? <SetTile set={chosenSet} user={user} /> : null}
    </div>
  );
}

export default Drafter
