import React, { useState, useRef, useImperativeHandle } from 'react';

import styles from './minesweeper.module.css'

import Grid from '@material-ui/core/Grid'
import Slider from '@material-ui/core/Slider'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import { createMuiTheme } from '@material-ui/core/styles'

import Header from './Header';
import AdvancedMenu from './AdvancedMenu';
import MineSweeperMap from './MineSweeperMap';

const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

const MineSweeperWindow = () => {

    const mapRef = useRef()

    const [totalMines, setTotalMines] = useState(10)
    let [flagsPlanted, setFlagsPlanted] = useState(0)
    const [numberOfRows, setNumberOfRows] = useState(10)
    const [numberOfCols, setNumberOfCols] = useState(10)
    const [spaceCSSSize, setSpaceCSSSize] = useState(2)
    const [mapCSSSize, setMapCSSSize] = useState(20)
    const [difficulty, setDifficulty] = useState(0)
    const [difficultyLabel, setDifficultyLabel] = useState('n00b')
    const [size, setSize] = useState(0)
    const [displayBoard, setDisplayBoard] = useState(false)
    const [startGame, setStartGame] = useState(false)
    const [currentStatus, setCurrentStatus] = useState('playing')

    const handleDifficultyChange = (e, value) => {
        setDifficulty(value)

        switch (value) {
            case 0:
                setDifficultyLabel('n00b')
                break;
            case 33:
                setDifficultyLabel('user')
                break;
            case 66:
                setDifficultyLabel('1337')
                break;
            case 100:
                setDifficultyLabel('h4x0r')
                break;
        }

        handleMapChange()
    }

    const handleSizeChange = (e, value) => {
        setSize(value)
        handleMapChange()
    }

    const handleMapChange = () => {
        if (size > 75) {
            setNumberOfRows(20)
            setNumberOfCols(20)
            setSpaceCSSSize(2)
            setMapCSSSize(40)
            if (difficulty > 83) {
                setTotalMines(80)
            } else if (difficulty > 50) {
                setTotalMines(60)
            } else if (difficulty > 17) {
                setTotalMines(40)
            } else {
                setTotalMines(20)
            }
        } else if (size > 25) {
            setNumberOfRows(10)
            setNumberOfCols(10)
            setSpaceCSSSize(2)
            setMapCSSSize(10)
            if (difficulty > 83) {
                setTotalMines(20)
            } else if (difficulty > 50) {
                setTotalMines(15)
            } else if (difficulty > 17) {
                setTotalMines(10)
            } else {
                setTotalMines(5)
            }
        } else {
            setNumberOfRows(5)
            setNumberOfCols(5)
            setSpaceCSSSize(2)
            setMapCSSSize(20)
            if (difficulty > 83) {
                setTotalMines(7)
            } else if (difficulty > 50) {
                setTotalMines(6)
            } else if (difficulty > 17) {
                setTotalMines(5)
            } else {
                setTotalMines(3)
            }
        }

    }

    const opacity = startGame ? 'block' : 'none';

    return (
        <>
            <div
                className={styles.window}
            >
                {currentStatus !== 'playing' && <div className={styles.popup}>
                    <div style={{width: '100%', marginBottom: '1rem'}}>
                        <span>You {currentStatus}!</span>
                    </div>
                    <button className={styles.lightBtn} onClick={() => setCurrentStatus('playing')}>Close</button>
                </div>}
                <Header />
                {!displayBoard ?
                    <AdvancedMenu
                        handleDifficultyChange={handleDifficultyChange}
                        handleSizeChange={handleSizeChange}
                        setDisplayBoard={setDisplayBoard}
                        scrollToTop={scrollToTop}
                        difficulty={difficulty}
                        size={size}
                    />
                    : <>
                        <div style={{ display: opacity }}>
                            <div className={styles.gameMenu}>
                                <div>
                                    <span>Flags: </span><span>{flagsPlanted}</span>
                                    <span>Mines: </span><span>{totalMines}</span>
                                </div>
                                <button
                                    className={styles.darkBtn}
                                    onClick={() => { setDisplayBoard(false), setStartGame(false), scrollToTop() }}>
                                    Back to Game Setup
                                </button>
                                <button
                                    className={styles.mediumBtn}
                                    onClick={() => mapRef.current.newGame()}>
                                    New Game
                                </button>
                                <button
                                    className={styles.mediumBtn}
                                    onClick={() => mapRef.current.restartGame()}>
                                    Restart
                                </button>
                                <button
                                    className={styles.darkBtn}
                                    onClick={() => mapRef.current.solveGame()}>
                                    Solve
                                </button>
                            </div>
                            <div style={{ width: '100%', color: 'green', display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                <p style={{}}>{flagsPlanted}/{totalMines} Found</p>
                                {currentStatus === 'lose' ?
                                    'You lost, try again!'
                                    :
                                        flagsPlanted === totalMines ? 'You Win!'
                                        :
                                        totalMines - flagsPlanted + ' Remaining'
                                }
                            </div>
                            <div className={styles.gameMap}
                                style={{ width: mapCSSSize + 'rem', height: mapCSSSize + 'rem' }}>
                                <MineSweeperMap
                                    ref={mapRef}
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
                        {startGame ? null :
                            <>
                                <button
                                    className={styles.mediumBtn}
                                    onClick={() => { setDisplayBoard(false), setStartGame(false) }}
                                >
                                    Back to Game Setup
                                </button>
                                <div className={styles.preview}>
                                    <span>Difficulty: {difficultyLabel}</span>
                                    <span>Viruses on Card: {totalMines}</span>
                                    <span>Card Size: {numberOfCols} x {numberOfRows}</span>
                                    <span>Starting Virus Coverage: {totalMines / (numberOfCols * numberOfRows) * 100}%</span>
                                </div>
                                <button
                                    //style={{ display: {...startGame[0] ? 'none' : 'block'} }}
                                    className={styles.lightBtn}
                                    onClick={() => { mapRef.current.newGame(), setStartGame(true) }}
                                >
                                    Begin
                                </button>
                            </>
                        }
                    </>
                }
            </div>
            <div className={styles.extendedBottom} />
        </>
    )
}

export default MineSweeperWindow