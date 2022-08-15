import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Pack from "./Pack.js";

function PackOpener() {
  let arr = [];
  const location = useLocation();
  const [packs, setPacks] = useState([]);
  const [index, setIndex] = useState(0);
  const [opened, setOpened] = useState(false);
  const [openedPacks, setOpenedPacks] = useState([]);

  useEffect(() => {
    console.log(location.state.numPacks.numPacks);
    console.log(location.state.set.set.name);
    let i = 1;
    while (i <= location.state.numPacks.numPacks) {
      getPack(location.state.set.set.code);
      i++;
    }
  }, []);

  async function getPack(code) {
    await fetch(`https://api.magicthegathering.io/v1/sets/${code}/booster`)
      .then((resp) => resp.json())
      .then((r) => {
        arr.push(r.cards);
        setPacks(arr)
        console.log(packs);
      });
  }
  function handleCommit(){
    fetch("/collections/")
  }

  function handleOpen() {
    if (!opened) {
      setOpened(!opened);
      setOpenedPacks([...openedPacks, packs[index]]);
      setIndex(index + 1)
    }
  }
  function handleNext() {
    if (opened) {
      setOpened(!opened);
    }
  }
  function handleOpenAll() {
    openedPacks.push(packs.slice(index, packs.length));
    setIndex(location.state.numPacks.numPacks)
  }

  return (
    <div>
      <div>
        {opened ? (
          index >= packs.length -1 ? null : (
            <button onClick={handleNext}>Next Pack</button>
          )
        ) : (
          <button onClick={handleOpen}>Open Pack</button>
        )}
      </div>
      {opened ? <Pack pack={packs[index]}/> : null}
      <h5>Packs Left: {location.state.numPacks.numPacks - (index) }/{location.state.numPacks.numPacks}</h5>
      {index >= packs.length - 1 ? (
        <div>
          <button onClick={handleCommit}>Add to Collection</button>
          <button>Draft Again</button>
        </div>
      ) : (
        <button onClick={handleOpenAll}>Open All Remaining</button>
      )}
    </div>
  );
}

export default PackOpener;
