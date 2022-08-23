import Cardraised from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Badge from "@mui/material/Badge";
import "./CardHover.css";

function CardCollectTile({ card }) {
  return (
    <div>
    <Cardraised
      sx={{
        margin: "auto",
      }}
      className="hoverBaby"
    >
      <div style={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={card.printing.info.imageUrl}
          alt="cardtile"
          sx={{ padding: "0em 0em 0em 0em", objectFit: "contain" }}
        />

        <Badge
          badgeContent={`${card.count}x`}
          color="primary"
          style={{
            position: "absolute",
            color: "white",
            top: 75,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        ></Badge>
      </div>
    </Cardraised>
    </div>
  );
}

export default CardCollectTile;
