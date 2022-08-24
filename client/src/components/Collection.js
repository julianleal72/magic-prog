import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ImageListItem from "@mui/material/ImageListItem";
import {Link} from 'react-router-dom'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Alert, Box } from "@mui/material";
import { FiEdit3 } from "react-icons/fi";
import DeleteIcon from "@mui/icons-material/Delete";
import { RiEmotionHappyLine, RiEmotionUnhappyLine } from "react-icons/ri";
import "./Deck.css";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
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

function Collection({ collection, user, reload }) {
    const [cards, setCards] = useState(collection.cards)
    console.log(collection);
    console.log(cards)
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    const [alert, setAlert] = useState(false);
    function deleteAlert() {
      setAlert(true);
    }
  
    function undoDelete() {
      setAlert(false);
    }

    function handleDelete(){
      fetch(`/collections/${collection.id}`, {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
      }).then(r=>r.json()).then(r => {console.log(r)
      reload()
      })
  }

    return (
<Card sx={{ maxWidth: 250 }}>
      <CardHeader
        title={collection.title}
        subheader=""
      />
      <CardMedia
        component="img"
        height="200"
        width="200"
        image={collection.icon}
        alt={collection.title}
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
            {collection.description}
        </CardContent>

      {/* <button><Link to="/user/collections/:id" state={{collection: {collection}, cards: {cards}}}>Manage Collection</Link></button> */}
      {/* <button onClick = {handleDelete}>Delete Collection</button> */}

      <CardContent className="buttonsDiv">
          <div className="buttonsDiv">
            <Button
              variant="contained"
              // onClick={handleEdit}
              className="edit"
              startIcon={<FiEdit3 />}
            >
              <Link to="/user/collections/:id" state={{collection: {collection}, cards: {cards}}}>Manage </Link>
            </Button>
            <Button
              variant="contained"
              className="delete"
              onClick={deleteAlert}
              endIcon={<DeleteIcon />}
              color="error"
            >
              Delete
            </Button>
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
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Collection;
