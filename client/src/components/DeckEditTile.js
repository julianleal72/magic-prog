import Cardraised from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ImageListItem from '@mui/material/ImageListItem';

function DeckEditTile({card}) {
 
  return (
    <Cardraised
    sx={{
      margin: "auto",
      padding: "0.1em", 
    }}
  ><div style={{position: "relative"}}>
      <CardMedia component="img" height="200" width="180" image={card.printing.info.imageUrl} alt="cardtile" sx={{ padding: "0em 0em 0em 0em", objectFit: "contain"}}/>
      <div style={{position: "absolute", color: "white",top: 30, left: "50%",transform: "translateX(-50%)", background: "black"}}> {card.count}x </div>
    </div></Cardraised>
  );
}

export default DeckEditTile;
