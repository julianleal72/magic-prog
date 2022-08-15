import CardTile from './CardTile.js'

function Pack({pack}){
    return(
        <div>{pack.map(card => <CardTile key = {card.name} card = {card}/>)}
        </div>
    )
}
export default Pack;