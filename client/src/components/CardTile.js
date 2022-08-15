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

function CardTile({card}) {
 
  return (
    <Cardraised
    sx={{
      maxWidth: 300,
      margin: "auto",
      padding: "0.1em", 
    }}
  >
      <CardMedia component="img" height="300" width="250" image={card.imageUrl} alt="cardtile" sx={{ padding: "0em 0em 0em 0em", objectFit: "contain"}}/>
    </Cardraised>
  );
}

export default CardTile;
