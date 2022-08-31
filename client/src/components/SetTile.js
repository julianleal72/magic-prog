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

  return (
    <div>
      <Card sx={{ width: 200 }}>
        <CardHeader
          avatar={<Avatar src={fixin.symbol} alt="symbol"/>}
          title={`${set.name} - ${set.code}`}
          subheader={`Released ${set.release}`}
        />
        <CardContent>
        <img src={fixin.booster} alt="booster pic"/>
        </CardContent>
      </Card>
    </div>
  );
}

export default SetTile;
