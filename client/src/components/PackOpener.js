import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OpenedPacks from "./OpenedPacks.js";
import Pack from "./Pack.js";

function PackOpener() {
  let arr = [];
  const navigate = useNavigate();
  const location = useLocation();
  const [goAgain, setGoAgain] = useState(false);
  const [errors, setErrors] = useState([]);
  const [packs, setPacks] = useState([]);
  const [openedAll, setOpenedAll] = useState(false);
  const [opened, setOpened] = useState(false);
  const [openedPacks, setOpenedPacks] = useState([]);

  useEffect(() => {
    console.log(location.state.numPacks.numPacks);
    console.log(location.state.set.set.name);
    console.log(location.state.collection.collection);
    let i = 1;
    while (i <= location.state.numPacks.numPacks) {
      getPack(location.state.set.set.code);
      i++;
    }
  }, []);

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
        delete card.rulings;
        delete card.foreignNames;
        delete card.originalText;
        delete card.originalType;
        let newCard = {
          collection_id: location.state.collection.collection,
          info: card,
        };
        console.log(newCard);
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
    console.log(packs)
    if (!opened) {
      setOpened(true);
      setOpenedPacks([...openedPacks, packs[0]]);
    }
    if (packs.length===1) setOpenedAll(true)
    console.log(openedPacks)
  }
  function handleNext() {
    let temp = [...packs]
    if (opened) {
      temp.shift()
      //console.log(temp)
      setPacks([...temp])
      setOpened(false);
    }
  }

  function handleDiscard() {
    navigate("/drafter");
  }
  function goagain() {
    // setOpened([])
    // setPacks([])
    // setOpened(false)
    // setOpenedAll(false)
    //setGoAgain(true);
    window.location.reload(false)
  }

  function condense(){
    let jesus = []
    console.log(openedPacks)
    openedPacks.forEach(element => {
      jesus = jesus.concat(element)
    });
    console.log(jesus)
    return jesus
  }
  //don't display dupes and just display how many copies

  return (
    <div>
      <div>
      {openedAll ? <div>
        <button onClick={handleCommit}>Add to Collection</button>
        <button onClick={goagain}>Draft Again</button>
      </div> : null}
        {openedAll ? null: <div>{opened ? <button onClick={handleNext}>Next Pack</button> : null}
       {opened ? null : <button onClick={handleOpen}>Open Pack</button>}</div>}
      </div>
      {opened ? <Pack pack={packs[0]} /> : null}
      <h5>
        Packs Left: {location.state.numPacks.numPacks - openedPacks.length}/
        {location.state.numPacks.numPacks}
      </h5>

      {/* ) : (
        <button onClick={handleOpenAll}>Open All Remaining</button>
      )} */}
      <div>
        <button onClick={handleDiscard}>Discard Draft</button>
      </div>
      <div>

      </div>
    </div>
  );
}

export default PackOpener;
