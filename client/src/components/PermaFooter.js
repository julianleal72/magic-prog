
import {MdOutlineEmail} from "react-icons/md"
import {FaPatreon, FaTwitter, FaTwitch} from "react-icons/fa"

function PermaFooter() {
  return (
    <div className="footer">
        <h5 style={{float:"left"}}>&copy; Hexdrinkers 2022</h5>
        <div style={{display:"inline-block", width:200, float:"right", position:"relative", top:20, right:-50}}>
        <a
          href="https://twitter.com/hexdrinkers"
          target="_blank"
        >
          <FaTwitter/>
        </a>&nbsp;&nbsp;&nbsp;&nbsp;
        <a
          href="https://www.patreon.com/hexdrinkers"
          target="_blank"
        >
          <FaPatreon/>
        </a>&nbsp;&nbsp;&nbsp;&nbsp;
        <a
          href="https://www.twitch.tv/the_hexdrinkers"
          target="_blank"
        >
          <FaTwitch/>
        </a>&nbsp;&nbsp;&nbsp;&nbsp;
        <a
          href="mailto:hexdrinkers@gmail.com?subject=Site%20Link"
        >
          <MdOutlineEmail/>
        </a>
        </div>
    </div>
  );
}
export default PermaFooter;
