import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pack from "./Pack.js";
import { Button, Alert } from "@mui/material";
import { GiOpenChest, GiBookmarklet } from "react-icons/gi";
import { BiArrowFromLeft } from "react-icons/bi";
import DeleteIcon from "@mui/icons-material/Delete";
import { RiEmotionHappyLine, RiEmotionUnhappyLine } from "react-icons/ri";
import { MdOutlineRestartAlt } from "react-icons/md";

function PackOpener() {
  let arr = [];
  const navigate = useNavigate();
  const location = useLocation();
  const [errors, setErrors] = useState([]);
  const [packs, setPacks] = useState([]);
  const [openedAll, setOpenedAll] = useState(false);
  const [opened, setOpened] = useState(false);
  const [openedPacks, setOpenedPacks] = useState([]);
  const [numPacks, setNumPacks] = useState(location.state.numPacks.numPacks);
  const [alert, setAlert] = useState(false);
  const [packArt, setPackArt] = useState(location.state.fixin.chosenFixin.booster)

  useEffect(() => {
    //console.log(location.state.numPacks.numPacks);
    //console.log(location.state.set.chosenSet)
    //console.log(location.state.collection.collection);
    let i = 1;
    while (i <= numPacks) {
      getPack(location.state.set.chosenSet.code);
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
    openedPacks.forEach((pack) => {
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
    console.log(packs);
    if (!opened) {
      setOpened(true);
      setOpenedPacks([...openedPacks, packs[0]]);
    }
    if (packs.length === 1) setOpenedAll(true);
    console.log(openedPacks);
  }
  function handleNext() {
    let temp = [...packs];
    if (opened) {
      temp.shift();
      //console.log(temp)
      setPacks([...temp]);
      setOpened(false);
    }
  }

  function handleDiscard() {
    navigate("/drafter");
  }

  function goagain() {
    setOpenedPacks([]);
    setOpened(false);
    setOpenedAll(false);
    let i = 1;
    while (i <= numPacks) {
      getPack(location.state.set.chosenSet.code);
      i++;
    }
  }

  function deleteAlert() {
    setAlert(true);
  }

  function undoDelete() {
    setAlert(false);
  }

  return (
    <div>
      <div>
        <h3>
          {numPacks} packs of {location.state.set.chosenSet.name}
        </h3>
        {openedAll ? (
          <div style={{ display: "inline" }}>
            <Button
              variant="contained"
              color="success"
              startIcon={<GiBookmarklet />}
              onClick={handleCommit}
            >
              Add to Collection
            </Button>
            <Button
              startIcon={<MdOutlineRestartAlt />}
              variant="contained"
              color="secondary"
              onClick={goagain}
            >
              Draft Again
            </Button>
            {alert ? null : (
              <Button
                variant="contained"
                onClick={deleteAlert}
                startIcon={<DeleteIcon />}
                color="error"
              >
                Discard Draft
              </Button>
            )}
            {alert ? (
              <Alert
                className="alert"
                severity="warning"
                action={
                  <div className="alertMessage">
                    <Button
                      variant="outlined"
                      onClick={undoDelete}
                      color="success"
                      startIcon={<RiEmotionHappyLine />}
                    >
                      Just Kidding, There's Resale Value
                    </Button>
                    <Button
                      onClick={handleDiscard}
                      variant="outlined"
                      endIcon={<RiEmotionUnhappyLine />}
                      color="error"
                    >
                      Uh, Yeah, These Pulls Were Trash
                    </Button>
                  </div>
                }
              >
                Are you sure you want to release these cards to the wind?
              </Alert>
            ) : null}
          </div>
        ) : null}
        {openedAll ? null : (
          <div>
            <h5>
              Packs Left: {numPacks - openedPacks.length}/{numPacks}
            </h5>
            {opened ? (
              <Button
                variant="outlined"
                color="success"
                startIcon={<BiArrowFromLeft />}
                onClick={handleNext}
              >
                Next Pack
              </Button>
            ) : null}
            {opened ? null : (
              <div>
                <Button
                  variant="contained"
                  startIcon={<GiOpenChest />}
                  onClick={handleOpen}
                >
                  Open Pack
                </Button>
                <br />
                <img src={packArt} alt="packBabyyy" style={{ maxWidth: 250 }} />
              </div>
            )}
          </div>
        )}
      </div>
      <br />
      {opened ? <Pack pack={packs[0]} /> : null}
      <div>
        <br />
        <div style={{ display: "inline" }}>
          {openedAll ? (
            <div style={{ display: "inline" }}>
              <Button
                variant="contained"
                color="success"
                startIcon={<GiBookmarklet />}
                onClick={handleCommit}
              >
                Add to Collection
              </Button>
              <Button
                startIcon={<MdOutlineRestartAlt />}
                variant="contained"
                color="secondary"
                onClick={goagain}
              >
                Draft Again
              </Button>
            </div>
          ) : null}
          {alert ? null : (
            <Button
              variant="contained"
              onClick={deleteAlert}
              startIcon={<DeleteIcon />}
              color="error"
            >
              Discard Draft
            </Button>
          )}
          {alert ? (
            <Alert
              className="alert"
              severity="warning"
              action={
                <div className="alertMessage">
                  <Button
                    variant="outlined"
                    onClick={undoDelete}
                    color="success"
                    startIcon={<RiEmotionHappyLine />}
                  >
                    Just Kidding, There's Resale Value
                  </Button>
                  <Button
                    onClick={handleDiscard}
                    variant="outlined"
                    endIcon={<RiEmotionUnhappyLine />}
                    color="error"
                  >
                    Uh, Yeah, These Pulls Were Trash
                  </Button>
                </div>
              }
            >
              Are you sure you want to release these cards to the wind?
            </Alert>
          ) : null}
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default PackOpener;
