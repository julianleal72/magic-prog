import CardTile from "./CardTile.js";
import "./Pack.css"
function Pack({ pack }) {
  return (
    <div className="pack">
      {pack.map((card) => (
        <CardTile key={card.name} card={card} />
      ))}</div>
  );
}
export default Pack;
