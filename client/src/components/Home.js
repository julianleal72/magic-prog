import {Link} from "react-router-dom"

function Home({user}){
    return <div>{user ? <button><Link to="/drafter">Draft!</Link></button>:null}</div>
}

export default Home;