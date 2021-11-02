import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";

import { ThemeContext } from "../../contexts/ThemeContext";
import navbarStyles from "./navbar.module.css";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import { fade, makeStyles } from "@mui/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MailIcon from "@mui/icons-material/Mail";
import MenuBook from "@mui/icons-material/MenuBook";
import Face from "@mui/icons-material/MenuBook";
import AssignmentInd from "@mui/icons-material/MenuBook";
import ImportantDevices from "@mui/icons-material/MenuBook";
import Memory from "@mui/icons-material/MenuBook";
import Brightness4 from "@mui/icons-material/MenuBook";
import FormatPaint from "@mui/icons-material/MenuBook";
import FlightLand from "@mui/icons-material/MenuBook";
import AssignmentTurnedIn from "@mui/icons-material/MenuBook";
import GitHub from "@mui/icons-material/MenuBook";
import Create from "@mui/icons-material/MenuBook";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import "@fontsource/mate-sc";
import "@fontsource/bebas-neue";
import "@fontsource/special-elite";
import "@fontsource/tourney";
import "@fontsource/dotgothic16";

const useStyles = makeStyles((theme) => ({
  
  searchIcon: {
    padding: "1rem",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: "1rem",
    // vertical padding + font size from searchIcon
    paddingLeft: "1rem",
    width: "100%",
  },
}));

const Navbar = () => {
  const { page, theme } = useContext(ThemeContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const [primaryNavElements, setPrimaryNavElements] = useState({
    titles: ["Introduction", "Biography", "Resume", "Portfolio", "Contact"],
    links: ["/introduction", "/biography", "/resume", "/portfolio", "/contact"],
    
  });

  const [secondaryNavElements, setSecondaryNavElements] = useState({
    titles: [
      "Retro Game",
      "Helio-Tour",
      "Pro Painting Estimator",
      "Video Landing Page",
      "Grocery List",
      "Git Reference",
      "Blog",
      "don't click this",
    ],
    links: [
      "/portfolio/minesweeper",
      "https://r3f-next.vercel.app/planets",
      "/portfolio/paintcalc",
      "/landingpage",
      "/portfolio/todo",
      "/git",
      "/posts",
      "/isaiddontclickthat",
    ],
    font: [
      "DotGothic16",
      "Tourney",
      "Mate SC",
      "Bebas Neue",
      "Mate SC",
      "Mate SC",
      "Mate SC",
      "Special Elite",
    ],
  });

  const classes = useStyles();

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={navbarStyles.root}>
      <AppBar
        position="static"
        style={{
          background: "rgba(32, 32, 32, " + scrollY / 400 + ")",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={navbarStyles.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={Boolean(anchorEl)} onClose={handleClose}>
            <div
              className={navbarStyles.list}
              role="presentation"
              onClick={handleClose}
              onKeyDown={handleClose}
            >
              <List>
                {primaryNavElements.titles.map((text, index) => (
                  <Link
                    passHref
                    href={primaryNavElements.links[index]}
                    key={index}
                  >
                    <ListItem button key={text}>
                      <ListItemText>
                        <span
                          style={{
                            fontFamily: "Special Elite",
                            fontSize: "1.2rem",
                          }}
                        >
                          {text}
                        </span>
                      </ListItemText>
                    </ListItem>
                  </Link>
                ))}
              </List>
              <Divider />
              <List style={{ color: "#888" }}>
                {secondaryNavElements.titles.map((text, index) => (
                  <Link
                    passHref
                    href={secondaryNavElements.links[index]}
                    key={index}
                  >
                    <ListItem button key={text}>
                      <ListItemText>
                        <span
                          style={{
                            fontFamily: secondaryNavElements.font[index],
                          }}
                        >
                          {text}
                        </span>
                      </ListItemText>
                    </ListItem>
                  </Link>
                ))}
              </List>
            </div>
          </Drawer>
          <Typography className={navbarStyles.title} variant="h6" noWrap>
            {page.pageTitle}{" "}
            <Link passHref href="/">
              <span
                style={{
                  color: "white",
                  fontFamily: "Special Elite",
                  fontSize: "1.2rem",
                }}
              >
                @CamMakesStuff
              </span>
            </Link>
          </Typography>
          <div className={navbarStyles.search}>
            <div className={navbarStyles.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              className={navbarStyles.searchInput}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
