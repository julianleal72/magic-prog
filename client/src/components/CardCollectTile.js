import Cardraised from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';

function CardCollectTile({card}) {
  const shapeStyles = { bgcolor: 'primary.main', width: 10, height: 10 };
const shapeCircleStyles = { borderRadius: '100%' };
  const circle = (
    <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles }} />
  );
  return (
    <Cardraised
    sx={{
      margin: "auto",
      padding: "0.1em", 
    }}
  ><div style={{position: "relative"}}>
      <CardMedia component="img" height="200" width="180" image={card.printing.info.imageUrl} alt="cardtile" sx={{ padding: "0em 0em 0em 0em", objectFit: "contain"}}/>

      <Badge badgeContent= {`${card.count}x`} color="primary" style={{position: "absolute", color: "white",top: 75, left: "50%",transform: "translateX(-50%)"}}>{circle}</Badge>
    </div></Cardraised>
  );
}

export default CardCollectTile;
