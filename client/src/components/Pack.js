import CardTile from "./CardTile.js";
import ImageList from "@mui/material/ImageList";

function Pack({ pack }) {
  return (
    <ImageList
      sx={{ width: 1000, height: 1200 }}
      cols={ 3
        //Math.floor(pack.length/3) 
      }
      rowHeight={200}
    >
      {pack.map((card) => (
        <CardTile key={card.name} card={card} />
      ))}
    </ImageList>
  );
}
export default Pack;
