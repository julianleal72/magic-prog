import {Link} from "react-router-dom"
import { useState, useEffect } from "react";
import Collection from "./Collection";

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
            <button><Link to="/collections/new">New Collection</Link></button>
            {collections.length > 0 ? 
            <div>
            {collections.map((collection) => <Collection collection={collection} user={user} reload={handleReload}/>
            )}
            </div>
            : "You have no collections! Try creating one."}
        </div>
    )

}

export default UserCollections