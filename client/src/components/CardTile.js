import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

function CardTile({card}) {
  return (
    <Card>
      <CardContent>
      <CardMedia component="img" height="50" width="50" image={card.imageUrl} alt="cardtile" />
        <Typography variant="body2" color="text.secondary">
          {card.name}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CardTile;
