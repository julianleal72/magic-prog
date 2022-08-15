import {Link} from "react-router-dom"
import { useState, useEffect } from "react";
import Collection from "./Collection";

function UserCollections({user}){
    const [collections, setCollections] = useState([]);

    useEffect(() => {
      async function goGetEm(){
        await fetch(`/users/${user.id}`)
        .then((r) => r.json())
        .then((r) => {
          setCollections(r.collections);
          console.log(r);
        })}
        goGetEm();
    }, [user.id]);

    return(
        <div>
            <button><Link to="/collections/new">New Collection</Link></button>
            {collections.length > 0 ? 
            <div>
            {user.collections.map((collection) => <Collection collection={collection} user={user}/>
            )}
            </div>
            : "You have no collections! Try creating one."}
        </div>
    )

}

export default UserCollections