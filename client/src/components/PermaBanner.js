import { NavLink} from "react-router-dom";
import { Button } from "@mui/material";
import "../App.css"

function PermaBanner(){
return(<NavLink to="/">
<Button>
  <img
    src="https://hexdrinkers.com/assets/images/banner.png"
    className="link"
  />
</Button>
</NavLink>)}

export default PermaBanner;