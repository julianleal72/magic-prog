import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Alert} from "@mui/material";
import { FiEdit3 } from "react-icons/fi";
import DeleteIcon from "@mui/icons-material/Delete";
import { RiEmotionHappyLine, RiEmotionUnhappyLine } from "react-icons/ri";
import "./Deck.css";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Deck({ deck, user, collection, reload }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  function deleteAlert() {
    setAlert(true);
  }

  function undoDelete() {
    setAlert(false);
  }
  function handleEdit() {
    navigate("/decks/edit/:id", {
      state: { deck: { deck } },
    });
  }
  function handleDelete() {
    fetch(`/decks/${deck.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        setAlert(false)
        reload();
      });
  }

  function cardCount(){
    let sum = 0;
    deck.cards.array.forEach((element)=> {
      sum += element.count
    })
    return sum
  }

  return (
    <Card sx={{ width: 300 }}>
      <CardHeader
        title={deck.name}
        subheader=""
        // action={
        //   <IconButton aria-label="share">
        //     <ShareIcon />
        //   </IconButton>
        // }
      />
      <CardMedia
        component="img"
        height="300"
        width="200"
        image={deck.icon}
        alt={deck.name}
        sx={{objectFit: "contain" }}
      />
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
            {/* {deck.collection.title} */}
            {deck.format} - {cardCount()} Cards <br />
            <div className="wrapIt">{deck.description}</div>
        </CardContent>
        <CardContent className="buttonsDiv">
            {alert? null : <div className="buttonsDiv"><Button
              variant="contained"
              onClick={handleEdit}
              className="edit"
              startIcon={<FiEdit3 />}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              className="delete"
              onClick={deleteAlert}
              endIcon={<DeleteIcon />}
              color="error"
            >
              Delete
            </Button></div>}
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
                      Keep it
                    </Button>
                    <Button
                      onClick={handleDelete}
                      variant="outlined"
                      endIcon={<RiEmotionUnhappyLine />}
                      color="error"
                    >
                      Delete it
                    </Button>
                  </div>
                }
              >
                Are you sure you want to delete this deck?
              </Alert>
            ) : null}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Deck;
