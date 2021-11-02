import React, { useState, forwardRef, useImperativeHandle } from "react";

import styles from "./minesweeper.module.css";
import {
  Cake,
  BugReport,
  Memory,
  Filter1,
  Filter2,
  Filter3,
  Filter4,
  Filter5,
  Filter6,
  Filter7,
  Filter8,
} from "@mui/icons-material";

import Space from "./Space";

const MineSweeperMap = (props) => {
  const gameOver = () => {
    props.setRevealedSpacesGrid([
      ...generateprops.revealedSpacesGrid(
        props.numberOfRows,
        props.numberOfCols,
        1
      ),
    ]);
    props.updateWindow("lose");
    props.setGameStillActive(false);
  };

  const gameWon = () => {
    setprops.revealedSpacesGrid([
      ...generateprops.revealedSpacesGrid(
        props.numberOfRows,
        props.numberOfCols,
        1
      ),
    ]);
  };

  const handleLeftClick = (event, row, col) => {
    event.preventDefault();
    if (props.revealedSpacesGrid[row][col] === 0) {
      // correct
      props.revealedSpacesGrid[row][col] = 2;
      props.setNumberOfFlagsPlanted(props.numberOfFlagsPlanted+1);
    } else if (props.revealedSpacesGrid[row][col] === 2) {
      props.revealedSpacesGrid[row][col] = 0;
    }
    props.setFlagsPlanted(props.numberOfFlagsPlanted);
    props.setRevealedSpacesGrid([...props.revealedSpacesGrid]);
  };

  const handleSpaceClick = (row, col) => {
    console.log("1", props.revealedSpacesGrid[row][col]);
    if (props.revealedSpacesGrid[row][col] === 1) {
      // already clicked
      return;
    }
    if (props.grid[row][col] === 0) {
      // an open space, no mines touching or nearby
      revealSurroundingZeroSpaces(row, col);
    }
    if (props.grid[row][col] === "x") {
      gameOver();
      return;
    }
    props.revealedSpacesGrid[row][col] = 1;
    let numberOfRevealedSpaces = 0;
    for (let i = 0; i < props.revealedSpacesGrid.length; i++) {
      for (let j = 0; j < props.revealedSpacesGrid[i].length; j++) {
        if (props.revealedSpacesGrid[i][j] === 1) {
          numberOfRevealedSpaces += 1;
        }
      }
    }

    console.log("2", props.revealedSpacesGrid[row][col]);
    props.setNumberOfRevealedSpaces(numberOfRevealedSpaces);
    props.setRevealedSpacesGrid([...props.revealedSpacesGrid]);
    numberOfRevealedSpaces ===
      props.totalCols * props.totalRows - props.numberOfMines && gameWon();
  };

  const revealSurroundingZeroSpaces = (y, x) => {
    let adjacentSpacesToReveal = [[y, x]];
    props.revealedSpacesGrid[y][x] = 1;
    while (adjacentSpacesToReveal.length > 0) {
      let [y, x] = adjacentSpacesToReveal[0];
      // top left
      if (
        props.grid[y - 1]?.[x - 1] >= 0 &&
        props.revealedSpacesGrid[y - 1]?.[x - 1] === 0
      ) {
        props.revealedSpacesGrid[y - 1][x - 1] = 1;
        props.grid[y - 1]?.[x - 1] === 0 &&
          adjacentSpacesToReveal.push([y - 1, x - 1]);
      }
      // top
      if (props.grid[y - 1]?.[x] >= 0 && props.revealedSpacesGrid[y - 1]?.[x] === 0) {
        props.revealedSpacesGrid[y - 1][x] = 1;
        props.grid[y - 1]?.[x] === 0 && adjacentSpacesToReveal.push([y - 1, x]);
      }
      // top right
      if (
        props.grid[y - 1]?.[x + 1] >= 0 &&
        props.revealedSpacesGrid[y - 1]?.[x + 1] === 0
      ) {
        props.revealedSpacesGrid[y - 1][x + 1] = 1;
        props.grid[y - 1]?.[x + 1] === 0 &&
          adjacentSpacesToReveal.push([y - 1, x + 1]);
      }
      // left
      if (props.grid[y]?.[x - 1] >= 0 && props.revealedSpacesGrid[y]?.[x - 1] === 0) {
        props.revealedSpacesGrid[y][x - 1] = 1;
        props.grid[y]?.[x - 1] === 0 && adjacentSpacesToReveal.push([y, x - 1]);
      }
      // right
      if (props.grid[y]?.[x + 1] >= 0 && props.revealedSpacesGrid[y]?.[x + 1] === 0) {
        props.revealedSpacesGrid[y][x + 1] = 1;
        props.grid[y]?.[x + 1] === 0 && adjacentSpacesToReveal.push([y, x + 1]);
      }
      // bottom left
      if (
        props.grid[y + 1]?.[x - 1] >= 0 &&
        props.revealedSpacesGrid[y + 1]?.[x - 1] === 0
      ) {
        props.revealedSpacesGrid[y + 1][x - 1] = 1;
        props.grid[y + 1]?.[x - 1] === 0 &&
          adjacentSpacesToReveal.push([y + 1, x - 1]);
      }
      // bottom
      if (props.grid[y + 1]?.[x] >= 0 && props.revealedSpacesGrid[y + 1]?.[x] === 0) {
        props.revealedSpacesGrid[y + 1][x] = 1;
        props.grid[y + 1]?.[x] === 0 && adjacentSpacesToReveal.push([y + 1, x]);
      }
      // bottom right
      if (
        props.grid[y + 1]?.[x + 1] >= 0 &&
        props.revealedSpacesGrid[y + 1]?.[x + 1] === 0
      ) {
        props.revealedSpacesGrid[y + 1][x + 1] = 1;
        props.grid[y + 1]?.[x + 1] === 0 &&
          adjacentSpacesToReveal.push([y + 1, x + 1]);
      }
      adjacentSpacesToReveal.shift();
    }
  };

  const generateSpaceContent = (row, col) => {
    let fontSize = (spaceSize) => {
      if (spaceSize < 3) return "small";
      else if (spaceSize > 5) return "small";
      else return "small";
    };

    if (props.revealedSpacesGrid[row][col] === 0) {
      // unclicked
      return <Memory fontSize={fontSize(props.spaceSize)} />;
    } else if (props.revealedSpacesGrid[row][col] === 1) {
      // affected by left click
      if (typeof props.grid[row][col] === "number") {
        // not a bug
        //return grid[row][col]
        switch (props.grid[row][col]) {
          case 0:
            return <Memory fontSize={fontSize(props.spaceSize)} />;
            break;
          case 1:
            return <Filter1 fontSize={fontSize(props.spaceSize)} />;
            break;
          case 2:
            return <Filter2 fontSize={fontSize(props.spaceSize)} />;
            break;
          case 3:
            return <Filter3 fontSize={fontSize(props.spaceSize)} />;
            break;
          case 4:
            return <Filter4 fontSize={fontSize(props.spaceSize)} />;
            break;
          case 5:
            return <Filter5 fontSize={fontSize(props.spaceSize)} />;
            break;
          case 6:
            return <Filter6 fontSize={fontSize(props.spaceSize)} />;
            break;
          case 7:
            return <Filter7 fontSize={fontSize(props.spaceSize)} />;
            break;
          case 8:
            return <Filter8 fontSize={fontSize(props.spaceSize)} />;
            break;
        }
      } else {
        // is a bug
        return <BugReport fontSize={fontSize(props.spaceSize)} />;
      }
    } else if (props.revealedSpacesGrid[row][col] === 2) {
      // been right clicked
      return <Cake fontSize={fontSize(props.spaceSize)} />;
    }
  };

  let map = [];

  for (let rowIndex = 0; rowIndex < props.grid.length; rowIndex++) {
    for (let colIndex = 0; colIndex < props.grid.length; colIndex++) {
      map.push(
        <Space
          spaceClass={styles.space}
          id={colIndex + "," + rowIndex}
          spaceSize={props.spaceSize}
          active={
            props.revealedSpacesGrid[rowIndex][colIndex] === 1 ? false : true
          }
          handleLeftClick={() => handleLeftClick(event, rowIndex, colIndex)}
          handleClick={() => handleSpaceClick(rowIndex, colIndex)}
          spaceContent={generateSpaceContent(rowIndex, colIndex)}
          gameStillActive={props.gameStillActive}
        />
      );
    }
  }

  return <div>{map}</div>;
};

export default MineSweeperMap;
