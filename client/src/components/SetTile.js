import {Card, CardHeader, CardMedia, CardContent} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {useState} from "react";
//import NewCollectionForm from "./NewCollectionForm.js"

function SetTile({ set, user, fixin }) {
  // const [newCollection, setNewCollection] = useState(false)
  // function handleNC() {
  //   setNewCollection(true)
  // }
  //  {newCollection ? <NewCollectionForm user={user} drafter ={true}></NewCollectionForm> : <button onClick={handleNC}>Create a New Collection</button>}
  console.log(fixin)
  return (
    <div>
      <Card sx={{ width: 250 }}>
        <CardHeader
          avatar={<Avatar src={fixin.symbol} sx={{height:60, width:60}} alt={fixin.code}/>}
          title={`${set.name} - ${set.code}`}
          subheader={`Released ${set.release}`}
        />
        <CardContent>
        <img src={fixin.booster} alt="booster pic"  style={{maxWidth:200}}/>
        </CardContent>
      </Card>
    </div>
  );
}

export default SetTile;
