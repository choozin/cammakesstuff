import { Height } from '@material-ui/icons';
import React, { useState, forwardRef, useImperativeHandle } from 'react'

import styles from './minesweeper.module.css'
import { Cake, BugReport, Memory, Filter1, Filter2, Filter3, Filter4, Filter5, Filter6, Filter7, Filter8 } from '@material-ui/icons';

import Space from './Space';

const generateRevealedSpacesGrid = (totalCols, totalRows, val) => {
    let grid = [];
    for (let i = 0; i < totalRows; i++) {
        grid[i] = [];
        for (let j = 0; j < totalCols; j++) {
            grid[i][j] = val
        }
    }
    return [...grid]
}

const generateGrid = (totalCols, totalRows, numberOfMines) => {
    let grid = generateRevealedSpacesGrid(totalCols, totalRows, 0);
    while (numberOfMines > 0) {
        const x = Math.floor(Math.random() * totalCols);
        const y = Math.floor(Math.random() * totalRows);
        if (grid[x][y] === 'x') continue;
        grid[x][y] = 'x';
        numberOfMines -= 1;
    }
    // calculate numbers
    for (let i = 0; i < totalRows; i++) {
        for (let j = 0; j < totalCols; j++) {
            if (grid[i][j] === 'x') {
                // top left
                if (typeof grid[i - 1]?.[j - 1] === 'number') grid[i - 1][j - 1]++;
                // top 
                if (typeof grid[i - 1]?.[j] === 'number') grid[i - 1][j]++;
                // top right
                if (typeof grid[i - 1]?.[j + 1] === 'number') grid[i - 1][j + 1]++;
                // left
                if (typeof grid[i]?.[j - 1] === 'number') grid[i][j - 1]++;
                // right
                if (typeof grid[i]?.[j + 1] === 'number') grid[i][j + 1]++;
                // bottom left
                if (typeof grid[i + 1]?.[j - 1] === 'number') grid[i + 1][j - 1]++;
                // bottom
                if (typeof grid[i + 1]?.[j] === 'number') grid[i + 1][j]++;
                // bottom right
                if (typeof grid[i + 1]?.[j + 1] === 'number') grid[i + 1][j + 1]++;
            }
        }
    }
    return [...grid]
}

const MineSweeperMap = forwardRef((props, ref) => {

    const [grid, setGrid] = useState(generateGrid(props.numberOfRows, props.numberOfCols, props.totalMines))
    const [revealedSpacesGrid, setRevealedSpacesGrid] = useState(generateRevealedSpacesGrid(props.numberOfRows, props.numberOfCols, props.totalMines))
    const [numberOfRevealedSpaces, setNumberOfRevealedSpaces] = useState(0);
    let [numberOfFlagsPlanted, setNumberOfFlagsPlanted] = useState(0)
    
    const [gameStillActive, setGameStillActive] = useState(true);
    
    useImperativeHandle(ref, () => ({
        newGame() {
            setNumberOfFlagsPlanted(0)
            props.setFlagsPlanted(0)
            setNumberOfRevealedSpaces(0)
            setGrid([
                ...generateGrid(props.numberOfRows, props.numberOfCols, props.totalMines)
            ])
            setRevealedSpacesGrid([
                ...generateRevealedSpacesGrid(props.numberOfRows, props.numberOfCols, 0)
            ])
            setGameStillActive(true)
        },
        restartGame() {
            setNumberOfFlagsPlanted(0)
            props.setFlagsPlanted(0)
            setNumberOfRevealedSpaces(0)
            setRevealedSpacesGrid([
                ...generateRevealedSpacesGrid(props.numberOfRows, props.numberOfCols, 0)
            ])
            setGameStillActive(true)
        },
        solveGame() {
            setNumberOfFlagsPlanted(0)
            props.setFlagsPlanted(0)
            setNumberOfRevealedSpaces(0)
            setRevealedSpacesGrid([
                ...generateRevealedSpacesGrid(props.numberOfRows, props.numberOfCols, 1)
            ])
        },
    }))

    const updateScore = () => {

    }

    const gameOver = () => {
        setRevealedSpacesGrid([
            ...generateRevealedSpacesGrid(props.numberOfRows, props.numberOfCols, 1)
        ])
        props.updateWindow('lose')
        setGameStillActive(false)
    }

    const gameWon = () => {
        setRevealedSpacesGrid([
            ...generateRevealedSpacesGrid(props.numberOfRows, props.numberOfCols, 1)
        ])
    }

    const handleLeftClick = (event, row, col) => {
        event.preventDefault()
        if (revealedSpacesGrid[row][col] === 0) {
            // correct
            revealedSpacesGrid[row][col] = 2;
            setNumberOfFlagsPlanted(++numberOfFlagsPlanted)
        } else if (revealedSpacesGrid[row][col] === 2) {
            revealedSpacesGrid[row][col] = 0;
        }
        props.setFlagsPlanted(numberOfFlagsPlanted)
        setRevealedSpacesGrid([...revealedSpacesGrid])
    }

    const handleSpaceClick = (row, col) => {
        console.log('1', revealedSpacesGrid[row][col])
        if (revealedSpacesGrid[row][col] === 1) { // already clicked
            return;
        }
        if (grid[row][col] === 0) { // an open space, no mines touching or nearby
            revealSurroundingZeroSpaces(row, col);
        }
        if (grid[row][col] === 'x') {
            gameOver();
            return
        }
        revealedSpacesGrid[row][col] = 1;
        let numberOfRevealedSpaces = 0;
        for (let i = 0; i < revealedSpacesGrid.length; i++) {
            for (let j = 0; j < revealedSpacesGrid[i].length; j++) {
                if (revealedSpacesGrid[i][j] === 1) {
                    numberOfRevealedSpaces += 1;
                }
            }
        } 

        console.log('2', revealedSpacesGrid[row][col])
        setNumberOfRevealedSpaces(numberOfRevealedSpaces)
        setRevealedSpacesGrid([...revealedSpacesGrid]);
        numberOfRevealedSpaces === (props.totalCols * props.totalRows - props.numberOfMines) && gameWon()
    }

    const revealSurroundingZeroSpaces = (y, x) => {

        let adjacentSpacesToReveal = [[y, x]]
        revealedSpacesGrid[y][x] = 1
        while (adjacentSpacesToReveal.length > 0) {
            let [y, x] = adjacentSpacesToReveal[0]
            // top left
            if (grid[y - 1]?.[x - 1] >= 0 && revealedSpacesGrid[y - 1]?.[x - 1] === 0) {
                revealedSpacesGrid[y - 1][x - 1] = 1;
                grid[y - 1]?.[x - 1] === 0 && adjacentSpacesToReveal.push([y - 1, x - 1])
            }
            // top
            if (grid[y - 1]?.[x] >= 0 && revealedSpacesGrid[y - 1]?.[x] === 0) {
                revealedSpacesGrid[y - 1][x] = 1;
                grid[y - 1]?.[x] === 0 && adjacentSpacesToReveal.push([y - 1, x])
            }
            // top right
            if (grid[y - 1]?.[x + 1] >= 0 && revealedSpacesGrid[y - 1]?.[x + 1] === 0) {
                revealedSpacesGrid[y - 1][x + 1] = 1;
                grid[y - 1]?.[x + 1] === 0 && adjacentSpacesToReveal.push([y - 1, x + 1])
            }
            // left
            if (grid[y]?.[x - 1] >= 0 && revealedSpacesGrid[y]?.[x - 1] === 0) {
                revealedSpacesGrid[y][x - 1] = 1;
                grid[y]?.[x - 1] === 0 && adjacentSpacesToReveal.push([y, x - 1])
            }
            // right
            if (grid[y]?.[x + 1] >= 0 && revealedSpacesGrid[y]?.[x + 1] === 0) {
                revealedSpacesGrid[y][x + 1] = 1;
                grid[y]?.[x + 1] === 0 && adjacentSpacesToReveal.push([y, x + 1])
            }
            // bottom left
            if (grid[y + 1]?.[x - 1] >= 0 && revealedSpacesGrid[y + 1]?.[x - 1] === 0) {
                revealedSpacesGrid[y + 1][x - 1] = 1;
                grid[y + 1]?.[x - 1] === 0 && adjacentSpacesToReveal.push([y + 1, x - 1])
            }
            // bottom
            if (grid[y + 1]?.[x] >= 0 && revealedSpacesGrid[y + 1]?.[x] === 0) {
                revealedSpacesGrid[y + 1][x] = 1;
                grid[y + 1]?.[x] === 0 && adjacentSpacesToReveal.push([y + 1, x])
            }
            // bottom right
            if (grid[y + 1]?.[x + 1] >= 0 && revealedSpacesGrid[y + 1]?.[x + 1] === 0) {
                revealedSpacesGrid[y + 1][x + 1] = 1;
                grid[y + 1]?.[x + 1] === 0 && adjacentSpacesToReveal.push([y + 1, x + 1])
            }
            adjacentSpacesToReveal.shift();
        }
    }

    const generateSpaceContent = (row, col) => {

        let fontSize = (spaceSize) => {
            if (spaceSize < 3) return 'small'
            else if (spaceSize > 5) return 'small'
            else return 'small'
        }

        if(revealedSpacesGrid[row][col] === 0) { // unclicked 
            return <Memory 
                fontSize={fontSize(props.spaceSize)}
            />
        } else if(revealedSpacesGrid[row][col] === 1) { // affected by left click
            if(typeof grid[row][col] === 'number') { // not a bug
                //return grid[row][col]
                switch (grid[row][col]) {
                    case 0 : return <Memory fontSize={fontSize(props.spaceSize)}/>
                    break;
                    case 1 : return <Filter1 fontSize={fontSize(props.spaceSize)}/>
                    break;
                    case 2 : return <Filter2 fontSize={fontSize(props.spaceSize)}/>
                    break;
                    case 3 : return <Filter3 fontSize={fontSize(props.spaceSize)}/>
                    break;
                    case 4 : return <Filter4 fontSize={fontSize(props.spaceSize)}/>
                    break;
                    case 5 : return <Filter5 fontSize={fontSize(props.spaceSize)}/>
                    break;
                    case 6 : return <Filter6 fontSize={fontSize(props.spaceSize)}/>
                    break;
                    case 7 : return <Filter7 fontSize={fontSize(props.spaceSize)}/>
                    break;
                    case 8 : return <Filter8 fontSize={fontSize(props.spaceSize)}/>
                    break;
                }
            } else { // is a bug
                return <BugReport fontSize={fontSize(props.spaceSize)}/>
            }
        } else if (revealedSpacesGrid[row][col] === 2) { // been right clicked
            return <Cake fontSize={fontSize(props.spaceSize)}/>
        }
    }

    let map = [];`1`

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        for (let colIndex = 0; colIndex < grid.length; colIndex++) {
            map.push(
                <Space
                    spaceClass={styles.space}
                    id={colIndex + ',' + rowIndex}
                    spaceSize={props.spaceSize}
                    active={revealedSpacesGrid[rowIndex][colIndex] === 1 ? false : true}
                    handleLeftClick={() => handleLeftClick(event, rowIndex, colIndex)}
                    handleClick={() => handleSpaceClick(rowIndex, colIndex)}
                    spaceContent={generateSpaceContent(rowIndex, colIndex)}
                    gameStillActive={gameStillActive}
                />
            )
        }
    }


    return (
        <div>
            {map}
        </div>
    )
})

export default MineSweeperMap