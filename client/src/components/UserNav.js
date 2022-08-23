import React from "react";
import { Link } from "react-router-dom";
import "./UserNav.css";
import { useState } from "react";
import { Button } from "@mui/material";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import {BsArrowsExpand, BsArrowsCollapse} from "react-icons/bs"
import { GiSpellBook, GiMagicSwirl, GiCastle } from "react-icons/gi";
import { BsFillCollectionFill } from "react-icons/bs";

import "react-pro-sidebar/dist/css/styles.css";

function UserNav({ user, handleLogout }) {
  const [menuCollapse, setMenuCollapse] = useState(true);

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <div className="sidebar" id="header">
      <ProSidebar collapsed={menuCollapse}>
        <SidebarHeader>
          <div className="greeting">
            <p>
              {menuCollapse ? (
                null
              ) : (
                `Hail, ${user.username}!`
              )}
            </p>
          </div>
          <div className="closemenu" onClick={menuIconClick}>
            {menuCollapse ? <BsArrowsExpand /> : <BsArrowsCollapse/>}
          </div>
        </SidebarHeader>
        {menuCollapse ? null:
        <SidebarContent>
          <Menu iconShape="square">
            <MenuItem icon={<GiMagicSwirl />}>
              <Link to={`/user`} className="button">
                My Info
              </Link>
            </MenuItem>
            <MenuItem icon={<GiSpellBook />}>
              <Link to={`/user/decks`} className="button">
                My Decks
              </Link>
            </MenuItem>
            <MenuItem icon={<BsFillCollectionFill />}>
              <Link to={`/user/collections`} className="button">
                My Collections
              </Link>
            </MenuItem>
            <MenuItem icon={<GiCastle />}>
              <Link to={`/`} className="button">
                Homepage
              </Link>
            </MenuItem>
          </Menu>
        </SidebarContent>
        }
        {menuCollapse ? null : (
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />} onClick={handleLogout}>
                Logout
              </MenuItem>
            </Menu>
          </SidebarFooter>
        )}
      </ProSidebar>
    </div>
  );
}

export default UserNav;
