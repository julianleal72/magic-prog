import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
//import NewCollectionForm from "./NewCollectionForm.js"

function SetTile({ set, user }) {
  // const [newCollection, setNewCollection] = useState(false)
  // function handleNC() {
  //   setNewCollection(true)
  // }
  //  {newCollection ? <NewCollectionForm user={user} drafter ={true}></NewCollectionForm> : <button onClick={handleNC}>Create a New Collection</button>}

  return (
    <div>
      <Card sx={{ width: 200}}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {set.code}
            </Avatar>
          }
          title={`${set.name} - ${set.code}`}
          subheader={`Released ${set.release}`}
        />
      </Card>
    </div>
  );
}

export default SetTile;
