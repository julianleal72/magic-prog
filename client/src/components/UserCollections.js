import {Link} from "react-router-dom"
import { useState, useEffect } from "react";
import Collection from "./Collection";
import { Grid, Button } from "@mui/material";
import "./UserDecks.css";
import {FcPlus} from "react-icons/fc"

function UserCollections({user}){
    const [collections, setCollections] = useState([]);
    const [reload, setReload] = useState(false)

    useEffect(() => {
      console.log()
        goGetEm();
    }, [reload])

    function goGetEm(){
      console.log("fetching")
      fetch(`/users/${user.id}`)
      .then((r) => r.json())
      .then((r) => {
        setCollections(r.collections);
        console.log(r)
      })}

    function handleReload(){
      console.log("triggered")
      setReload(!reload)
    }

    return(
        <div>
            <Button variant="outlined" color="success" startIcon={<FcPlus/>}><Link to="/collections/new">New Collection</Link></Button>
            <br />
            {collections.length > 0 ? 
            <Grid
            spacing={2}
            container
            direction="row"
            justifyContent="center"
            className="cardContainer"
          >
            {collections.map((collection) => <Collection collection={collection} user={user} reload={handleReload}/>
            )}
            </Grid>
            : "You have no collections! Try creating one."}
        </div>
    )
}

export default UserCollections