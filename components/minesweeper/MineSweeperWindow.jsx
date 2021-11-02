import React, { useState, useRef } from "react";

import styles from "./minesweeper.module.css";

import Grid from "@mui/material/Grid";
import ThemeProvider from "@mui/styles/ThemeProvider";
import { createMuiTheme } from "@mui/material/styles";

import Header from "./Header";
import AdvancedMenu from "./AdvancedMenu";
import MineSweeperMap from "./MineSweeperMap";

const scrollToTop = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

const generateRevealedSpacesGrid = (totalCols, totalRows, val) => {
  let grid = [];
  for (let i = 0; i < totalRows; i++) {
    grid[i] = [];
    for (let j = 0; j < totalCols; j++) {
      grid[i][j] = val;
    }
  }
  return [...grid];
};

const generateGrid = (totalCols, totalRows, numberOfMines) => {
  let grid = generateRevealedSpacesGrid(totalCols, totalRows, 0);
  while (numberOfMines > 0) {
    const x = Math.floor(Math.random() * totalCols);
    const y = Math.floor(Math.random() * totalRows);
    if (grid[x][y] === "x") continue;
    grid[x][y] = "x";
    numberOfMines -= 1;
  }
  // calculate numbers
  for (let i = 0; i < totalRows; i++) {
    for (let j = 0; j < totalCols; j++) {
      if (grid[i][j] === "x") {
        // top left
        if (typeof grid[i - 1]?.[j - 1] === "number") grid[i - 1][j - 1]++;
        // top
        if (typeof grid[i - 1]?.[j] === "number") grid[i - 1][j]++;
        // top right
        if (typeof grid[i - 1]?.[j + 1] === "number") grid[i - 1][j + 1]++;
        // left
        if (typeof grid[i]?.[j - 1] === "number") grid[i][j - 1]++;
        // right
        if (typeof grid[i]?.[j + 1] === "number") grid[i][j + 1]++;
        // bottom left
        if (typeof grid[i + 1]?.[j - 1] === "number") grid[i + 1][j - 1]++;
        // bottom
        if (typeof grid[i + 1]?.[j] === "number") grid[i + 1][j]++;
        // bottom right
        if (typeof grid[i + 1]?.[j + 1] === "number") grid[i + 1][j + 1]++;
      }
    }
  }
  return [...grid];
};

const MineSweeperWindow = () => {
  const [totalMines, setTotalMines] = useState(10);
  const [flagsPlanted, setFlagsPlanted] = useState(0);
  const [numberOfRows, setNumberOfRows] = useState(10);
  const [numberOfCols, setNumberOfCols] = useState(10);
  const [spaceCSSSize, setSpaceCSSSize] = useState(2);
  const [mapCSSSize, setMapCSSSize] = useState(20);
  const [difficulty, setDifficulty] = useState("user");
  const [size, setSize] = useState("mega");
  const [gameGenerated, setGameGenerated] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("playing");

  const [grid, setGrid] = useState(
    generateGrid(numberOfRows, numberOfCols, totalMines)
  );
  const [revealedSpacesGrid, setRevealedSpacesGrid] = useState(
    generateRevealedSpacesGrid(numberOfRows, numberOfCols, totalMines)
  );
  const [numberOfRevealedSpaces, setNumberOfRevealedSpaces] = useState(0);
  const [numberOfFlagsPlanted, setNumberOfFlagsPlanted] = useState(0);
  const [gameStillActive, setGameStillActive] = useState(true);

  const opacity = startGame ? "block" : "none";

  const createGame = () => {
    if (size > 75) {
      setNumberOfRows(20);
      setNumberOfCols(20);
      setSpaceCSSSize(2);
      setMapCSSSize(40);
      if (difficulty > 83) {
        setTotalMines(80);
      } else if (difficulty > 50) {
        setTotalMines(60);
      } else if (difficulty > 17) {
        setTotalMines(40);
      } else {
        setTotalMines(20);
      }
    } else if (size > 25) {
      setNumberOfRows(10);
      setNumberOfCols(10);
      setSpaceCSSSize(2);
      setMapCSSSize(10);
      if (difficulty > 83) {
        setTotalMines(20);
      } else if (difficulty > 50) {
        setTotalMines(15);
      } else if (difficulty > 17) {
        setTotalMines(10);
      } else {
        setTotalMines(5);
      }
    } else {
      setNumberOfRows(5);
      setNumberOfCols(5);
      setSpaceCSSSize(2);
      setMapCSSSize(20);
      if (difficulty > 83) {
        setTotalMines(7);
      } else if (difficulty > 50) {
        setTotalMines(6);
      } else if (difficulty > 17) {
        setTotalMines(5);
      } else {
        setTotalMines(3);
      }
    }
  };

  const newGame = () => {
    setNumberOfFlagsPlanted(0);
    setFlagsPlanted(0);
    setNumberOfRevealedSpaces(0);
    setGrid([...generateGrid(numberOfRows, numberOfCols, totalMines)]);
    setRevealedSpacesGrid([
      ...generateRevealedSpacesGrid(numberOfRows, numberOfCols, 0),
    ]);
    setGameStillActive(true);
  };

  const restartGame = () => {
    setNumberOfFlagsPlanted(0);
    setFlagsPlanted(0);
    setNumberOfRevealedSpaces(0);
    setRevealedSpacesGrid([
      ...generateRevealedSpacesGrid(numberOfRows, numberOfCols, 0),
    ]);
    setGameStillActive(true);
  };

  const solveGame = () => {
    setNumberOfFlagsPlanted(0);
    setFlagsPlanted(0);
    setNumberOfRevealedSpaces(0);
    setRevealedSpacesGrid([
      ...generateRevealedSpacesGrid(numberOfRows, numberOfCols, 1),
    ]);
  };

  return (
    <>
      <div className={styles.window}>
        {currentStatus !== "playing" && (
          <div className={styles.popup}>
            <div style={{ width: "100%", marginBottom: "1rem" }}>
              <span>You {currentStatus}!</span>
            </div>
            <button
              className={styles.lightBtn}
              onClick={() => setCurrentStatus("playing")}
            >
              Close
            </button>
          </div>
        )}
        <Header />
        {!gameGenerated ? (
          <AdvancedMenu
            scrollToTop={scrollToTop}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            size={size}
            setSize={setSize}
            setGameGenerated={setGameGenerated}
            createGame={createGame}
          />
        ) : !startGame ? (
          <>
            <button
              className={styles.mediumBtn}
              onClick={() => {
                setGameGenerated(false), setStartGame(false);
              }}
            >
              Back to Game Setup
            </button>
            <div className={styles.preview}>
              <span>Difficulty: {difficulty}</span>
              <span>Viruses on Card: {totalMines}</span>
              <span>
                Card Size: {numberOfCols} x {numberOfRows}
              </span>
              <span>
                Starting Virus Coverage:{" "}
                {(totalMines / (numberOfCols * numberOfRows)) * 100}%
              </span>
            </div>
            <button
              className={styles.lightBtn}
              onClick={() => {
                newGame(), setStartGame(true);
              }}
            >
              Begin
            </button>
          </>
        ) : (
          <>
            <div style={{ display: opacity }}>
              <div className={styles.gameMenu}>
                <div>
                  <span>Flags: </span>
                  <span>{flagsPlanted}</span>
                  <span>Mines: </span>
                  <span>{totalMines}</span>
                </div>
                <button
                  className={styles.darkBtn}
                  onClick={() => {
                    setGameGenerated(false), setStartGame(false), scrollToTop();
                  }}
                >
                  Back to Game Setup
                </button>
                <button className={styles.mediumBtn} onClick={() => newGame()}>
                  New Game
                </button>
                <button
                  className={styles.mediumBtn}
                  onClick={() => restartGame()}
                >
                  Restart
                </button>
                <button className={styles.darkBtn} onClick={() => solveGame()}>
                  Solve
                </button>
              </div>
              <div
                style={{
                  width: "100%",
                  color: "green",
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <p style={{}}>
                  {flagsPlanted}/{totalMines} Found
                </p>
                {currentStatus === "lose"
                  ? "You lost, try again!"
                  : flagsPlanted === totalMines
                  ? "You Win!"
                  : totalMines - flagsPlanted + " Remaining"}
              </div>
              <div
                className={styles.gameMap}
                style={{
                  width: mapCSSSize + "rem",
                  height: mapCSSSize + "rem",
                  margin: '0 auto',
                }}
              >
                <MineSweeperMap
                  grid={grid}
                  setGrid={setGrid}
                  revealedSpacesGrid={revealedSpacesGrid}
                  setRevealedSpacesGrid={setRevealedSpacesGrid}
                  numberOfRevealedSpaces={numberOfRevealedSpaces}
                  setNumberOfRevealedSpaces={setNumberOfRevealedSpaces}
                  numberOfFlagsPlanted={numberOfFlagsPlanted}
                  setNumberOfFlagsPlanted={setNumberOfFlagsPlanted}
                  gameStillActive={gameStillActive}
                  setGameStillActive={setGameStillActive}
                  totalMines={totalMines}
                  flagsPlanted={flagsPlanted}
                  setFlagsPlanted={setFlagsPlanted}
                  numberOfRows={numberOfRows}
                  numberOfCols={numberOfCols}
                  spaceSize={spaceCSSSize}
                  updateWindow={setCurrentStatus}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <div className={styles.extendedBottom} />
    </>
  );
};

export default MineSweeperWindow;
