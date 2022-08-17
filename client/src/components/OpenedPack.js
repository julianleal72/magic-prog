import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function OpenedPacks({openedPacks}){
    return(
        <Box sx={{ flexGrow: 1 }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {openedPacks.forEach(element => {
            element.map((card) => (
                <CardCollectTile key={card.printing.name} card={card} />
              ))})
          }
        </Grid>
      </Box>
    )
}

export default OpenedPacks