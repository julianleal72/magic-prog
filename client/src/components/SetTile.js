import {Card, CardHeader, CardMedia} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {useState} from "react";
//import NewCollectionForm from "./NewCollectionForm.js"

function SetTile({ set, user, fixins }) {
  // const [newCollection, setNewCollection] = useState(false)
  // function handleNC() {
  //   setNewCollection(true)
  // }
  //  {newCollection ? <NewCollectionForm user={user} drafter ={true}></NewCollectionForm> : <button onClick={handleNC}>Create a New Collection</button>}
  const [fixin, setFixin] = useState(
    fixins.filter(element => element.code === set.code)
  );
  console.log(fixin)
  return (
    <div>
      <Card sx={{ width: 200 }}>
        <CardHeader
          avatar={<Avatar src={fixin.symbol} alt="symbol"/>}
          title={`${set.name} - ${set.code}`}
          subheader={`Released ${set.release}`}
        />
        <CardMedia component="img" image={fixin.booster}/>
      </Card>
    </div>
  );
}

export default SetTile;
