import { MdOutlineEmail } from "react-icons/md";
import { FaPatreon, FaTwitter, FaTwitch } from "react-icons/fa";

import "../App.css";

function PermaFooter() {
  return (
    <div>
      <div className="footer">
        <div
          style={{
            display: "inline-block",
            float: "right",
            position: "relative",
            top: 10,
            height: 30,
          }}
        >
          <a href="https://twitter.com/hexdrinkers" target="_blank">
            <FaTwitter />
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <a href="https://www.patreon.com/hexdrinkers" target="_blank">
            <FaPatreon />
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <a href="https://www.twitch.tv/the_hexdrinkers" target="_blank">
            <FaTwitch />
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <a href="mailto:hexdrinkers@gmail.com?subject=Site%20Link">
            <MdOutlineEmail />
          </a>
        </div>
        <div style={{ float: "left", position: "relative", height:30 }}>
          <h5>&copy; Hexdrinkers 2022</h5>
        </div>
      </div>
      <div style={{position:"relative", height:30}}>
        <h6>
          Wizards of the Coast, Magic: The Gathering, and their logos are
          trademarks of Wizards of the Coast LLC. © 1995-2022 Wizards. All
          rights reserved. The Hexdrinkers are not affiliated with Wizards of
          the Coast LLC.
        </h6>
      </div>
    </div>
  );
}
export default PermaFooter;
