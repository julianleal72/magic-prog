import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function DraftSlider({numPacks, setNumPacks}) {
  
    function handleSlide(e) {
    setNumPacks(e.target.value);
    console.log(e.target.value);
  }
  const marks = [
    { value: 3, label: "Draft" },
    { value: 6, label: "Sealed" },
    { value: 24, label: "Masters Set Box" },
    { value: 36, label: "Booster Box" },
  ];
  

  return (
    <Box sx={{ width: 700 }}>
      <Typography id="input-slider" gutterBottom>
        Number of Packs - {numPacks}
      </Typography>
      <Slider
        aria-label="Number of Packs"
        defaultValue={3}
        valueLabelDisplay="auto"
        step={1}
        marks={marks}
        min={1}
        max={36}
        onChange={handleSlide}
      />
    </Box>
  );
}

export default DraftSlider;
