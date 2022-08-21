import Grid from "@mui/material/Grid";
import Cardraised from "@mui/material/Card";
import Box from "@mui/material/Box";

function OpenedPacks({ openedPacks }) {
  
  function condense(){
    let jesus = []
    console.log(openedPacks)
    openedPacks.forEach(element => {
      jesus = jesus.concat(element)
    });
    console.log(jesus)
    return jesus
  }

  return (<div>
    <h1>Where the fuck are the packs?</h1>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} >
        {condense().map(card => {
          {console.log(card)}
              <img alt="openedcard" src={card.imageUrl} />
        })}
      </Grid>
    </Box>
    </div>
  );
}

export default OpenedPacks;
