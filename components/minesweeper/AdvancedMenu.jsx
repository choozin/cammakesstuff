import React, { useState } from "react";

import styles from "./minesweeper.module.css";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import ThemeProvider from "@mui/styles/ThemeProvider";
import { createMuiTheme } from "@mui/material/styles";

const AdvancedMenu = ({
  difficulty,
  setDifficulty,
  size,
  setSize,
  setGameGenerated,
  createGame,
  scrollToTop,
}) => {
  return (
    <>
      <div className={styles.advancedMenu}>
        <h4>Select Your Skill Level</h4>
        <div className={styles.menuBtnSection}>
          <button
            style={{border: difficulty === 'noob' && 'dashed 3px #8F8', margin: difficulty === 'noob' && '-3px'}}
            className={styles.menuBtn}
            onClick={() => setDifficulty("noob")}
          >
            n00b
          </button>
          <button
            style={{border: difficulty === 'user' && 'dashed 3px #8F8', margin: difficulty === 'user' && '-3px'}}
            className={styles.menuBtn}
            onClick={() => setDifficulty("user")}
          >
            user
          </button>
          <button
            style={{border: difficulty === '1337' && 'dashed 3px #8F8', margin: difficulty === '1337' && '-3px'}}
            className={styles.menuBtn}
            onClick={() => setDifficulty("1337")}
          >
            1337
          </button>
          <button
            style={{border: difficulty === 'h4x0r' && 'dashed 3px #8F8', margin: difficulty === 'h4x0r' && '-3px'}}
            className={styles.menuBtn}
            onClick={() => setDifficulty("h4x0r")}
          >
            h4x0r
          </button>
        </div>
        <h4>Select Your Card Size</h4>
        <div className={styles.menuBtnSection}>
          <button style={{border: size === 'kilo' && 'dashed 3px #8F8', margin: size === 'kilo' && '-3px'}}
            className={styles.menuBtn} onClick={() => setSize("kilo")}>
            kilo
          </button>
          <button style={{border: size === 'mega' && 'dashed 3px #8F8', margin: size === 'mega' && '-3px'}}
            className={styles.menuBtn} onClick={() => setSize("mega")}>
            mega
          </button>
          <button style={{border: size === 'giga' && 'dashed 3px #8F8', margin: size === 'giga' && '-3px'}}
            className={styles.menuBtn} onClick={() => setSize("giga")}>
            giga
          </button>
        </div>
        <button
          className={styles.lightBtn}
          onClick={() => {
            setGameGenerated(true), createGame, scrollToTop;
          }}
        >
          Create Game
        </button>
      </div>
    </>
  );
};

export default AdvancedMenu;
