import Cardraised from "@mui/material/Card";
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
import {useState} from 'react'

function Collection({ collection, user }) {
    const [cards, setCards] = useState(user.cards.filter(card => card.collection_id === collection.id))
    console.log(collection);
    console.log(cards)
    return (
    <Cardraised
      sx={{
        maxWidth: 300,
        margin: "auto",
        padding: "0.1em",
      }}
    >
      <CardMedia
        component="img"
        height="300"
        width="250" //image={card.imageUrl}
        alt="cardtile"
        sx={{ padding: "0em 0em 0em 0em", objectFit: "contain" }}
      />
      <CardContent>
        {collection.title} - {collection.description}
      </CardContent>
      <button><Link to="/user/collections/:id" state={{collection: {collection}, cards: {cards}}}>Manage Collection</Link></button>
    </Cardraised>
  );
}

export default Collection;
