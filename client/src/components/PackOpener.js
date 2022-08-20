import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pack from "./Pack.js";

function PackOpener() {
  let arr = [];
  const navigate = useNavigate();
  const location = useLocation();
  const [goAgain, setGoAgain] = useState(false)
  const [errors, setErrors] = useState([]);
  const [packs, setPacks] = useState([]);
  const [index, setIndex] = useState(0);
  const [openedAll, setOpenedAll] = useState(false);
  const [opened, setOpened] = useState(false);
  const [openedPacks, setOpenedPacks] = useState([]);

  useEffect(() => {
    console.log(location.state.numPacks.numPacks);
    console.log(location.state.set.set.name);
    console.log(location.state.collection.collection)
    let i = 1;
    while (i <= location.state.numPacks.numPacks) {
      getPack(location.state.set.set.code);
      i++;
    }
  }, [goAgain]);

  function getPack(code) {
    fetch(`https://api.magicthegathering.io/v1/sets/${code}/booster`)
      .then((resp) => resp.json())
      .then((r) => {
        arr.push(r.cards);
        setPacks(arr);
        console.log(packs);
      });
  }

  function handleCommit() {
    packs.forEach((pack) => {
      pack.forEach((card) => {
        
        let newCard = {
          collection_id: location.state.collection.collection,
          info: card,
        };
        console.log(newCard)
        fetch("/cards", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(newCard),
        }).then((r) => {
          if (r.ok) console.log("ok");
          else r.json().then((json) => setErrors(Object.entries(json.errors)));
        });
      });
      navigate(`/user/collections`);
    });
  }

  function handleOpen() {
    if (!opened) {
    setOpened(true)
    console.log(index);
    console.log(packs.length)
    setOpenedPacks([...openedPacks, packs[index]]);
    if(index < packs.length-1) setIndex(index + 1);
    }
  }
  function handleNext() {
    if (opened) {
    console.log(index);
    setOpened(false);
    }
  }
  function handleOpenAll() {
    // openedPacks.push(packs.slice(index, packs.length));
    // setOpenedAll(true);
    // setIndex(location.state.numPacks.numPacks);
  }
  function handleDiscard(){
    navigate("/drafter")
  }
  function goagain(){
    setGoAgain(true)
  }

  //don't display dupes and just display how many copies

  return (
    <div>
      <div>
        {opened ? 
            <button onClick={handleNext}>Next Pack</button> : null}
        {openedAll ? null : (
          <button onClick={handleOpen}>Open Pack</button>
        )}
      </div>
      {opened ? <Pack pack={packs[index]} /> : null}
      <h5>
        Packs Left: {location.state.numPacks.numPacks - index}/
        {location.state.numPacks.numPacks}
      </h5>
      {/* {index > packs.length - 1 ? ( */}
        <div>
          <button onClick={handleCommit}>Add to Collection</button>
          <button onClick={goagain}>Re-Do Draft</button>
        </div>
      {/* ) : (
        <button onClick={handleOpenAll}>Open All Remaining</button>
      )} */}
      <div><button onClick={handleDiscard}>Discard Draft</button></div>
      <div>
        {openedPacks.map((pack) => (
          <Pack pack={pack} />
        ))}
      </div>
    </div>
  );
}

export default PackOpener;
