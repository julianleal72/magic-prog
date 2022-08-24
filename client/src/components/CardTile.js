import Cardraised from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import "./CardHover.css"

function CardTile({card}) {
 
  return (
    <div >
    <Cardraised
    sx={{
      margin: "auto"
    }} //className="hoverBaby"
  >
      <CardMedia component="img" height="200" image={card.imageUrl} alt="cardtile" sx={{ padding: "0em 0em 0em 0em", objectFit: "contain"}}/>
    </Cardraised></div>
  );
}

export default CardTile;
