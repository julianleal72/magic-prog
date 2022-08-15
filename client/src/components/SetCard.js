import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function SetCard({ set }) {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //   function valuetext(value) {
  //     return `${value}°C`;
  //   }
  const marks = [
    { value: 3, label: "Booster Draft" },
    { value: 6, label: "Sealed Pool" },
    { value: 24, label: "Masters Set Box" },
    { value: 36, label: "Booster Box" },
  ];
  const [numPacks, setNumPacks] = useState(3);
  function handleSlide(e) {
    setNumPacks(e.target.value);
    console.log(e.target.value);
  }

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {set.code}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={`${set.name} - ${set.code}`}
          subheader={`Released ${set.release}`}
        />
        <CardMedia component="img" height="194" image="" alt="" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Something here
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit></Collapse>
      </Card>
      <Box sx={{ width: 700 }}>
      <Typography id="input-slider" gutterBottom>
        Number of Packs
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
        <h5>{numPacks}</h5>
      </Box>
      <Button>
        <Link to="/packopener" state={{numPacks: {numPacks}, set: {set}}}>Draft!</Link>
      </Button>
    </div>
  );
}

export default SetCard;
