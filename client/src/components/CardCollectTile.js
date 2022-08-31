import Cardraised from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
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
          alt={`${card.printing.info.name} - ${card.count}`}
          sx={{ padding: "0em 0em 0em 0em", objectFit: "contain" }}
        />
        <Chip className="chipper-gore"
          label={`${card.count}x`}
          style={{
            width:30,
            position: "absolute",
            color:"black",
            fontWeight:"bold",
            background:"yellow",
            top: 80,
            left: "22%",
            transform: "translateX(-50%)",
          }}
        ></Chip>
      </div>
    </Cardraised>
    </div>
  );
}

export default CardCollectTile;