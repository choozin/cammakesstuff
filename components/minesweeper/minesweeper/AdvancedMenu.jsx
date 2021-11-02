import React, { useState } from 'react';

import styles from './minesweeper.module.css'
import Slider from '@material-ui/core/Slider'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import { createMuiTheme } from '@material-ui/core/styles'

const AdvancedMenu = (props) => {

    const difficultyTheme = createMuiTheme({
        overrides: {
            MuiSlider: {
                thumb: {
                    color: '#8F8',
                    height: '1rem',
                    width: '1rem',
                    marginTop: '0rem',
                    marginLeft: '-0.4rem',
                    borderRadius: '2rem'
                },
                track: {
                    color: '#484',
                    height: '1rem',
                },
                rail: {
                    color: '#080',
                    height: '1rem',
                },
            }
        }
    })

    const sizeTheme = createMuiTheme({
        overrides: {
            MuiSlider: {
                thumb: {
                    color: '#8F8',
                    height: '1rem',
                    width: '1rem',
                    marginTop: '0rem',
                    marginLeft: '-0.4rem',
                    borderRadius: '2rem'
                },
                track: {
                    color: '#484',
                    height: '1rem',
                },
                rail: {
                    color: '#080',
                    height: '1rem',
                },
            }
        }
    })

    const difficultyMarks = [
        { value: 0 },
        { value: 33 },
        { value: 66 },
        { value: 99 },
    ]

    const sizeMarks = [
        { value: 0 },
        { value: 50 },
        { value: 100 },
    ]

    return (
        <>
            <div className={styles.advancedMenu}>
                <h4>Select Your Skill Level</h4>
                <ThemeProvider theme={difficultyTheme}>
                    <Slider
                        step={33}
                        marks={difficultyMarks}
                        onChange={props.handleDifficultyChange}
                    />
                </ThemeProvider>
                <div className={styles.sliderLabels}>
                    <span style={props.difficulty < 25 ? {fontWeight: '900'} : {fontWeight: 'normal'}}>n00b</span>
                    <span style={props.difficulty > 25 && props.difficulty < 50 ? {fontWeight: '900'} : {fontWeight: 'normal'}}>User</span>
                    <span style={props.difficulty > 50 && props.difficulty < 75 ? {fontWeight: '900'} : {fontWeight: 'normal'}}>1337</span>
                    <span style={props.difficulty > 75 ? {fontWeight: '900'} : {fontWeight: 'normal'}}>h4x0r</span>
                </div>
                <h4>Select Your Card Size</h4>
                <ThemeProvider theme={sizeTheme}>
                    <Slider
                        step={50}
                        marks={sizeMarks}
                        onChange={props.handleSizeChange}
                    />
                </ThemeProvider>
                <div className={styles.sliderLabels}>
                    <span style={props.size < 25 ? {fontWeight: '900'} : {fontWeight: 'normal'}}>Kilo</span>
                    <span style={props.size > 25 && props.size < 75 ? {fontWeight: '900'} : {fontWeight: 'normal'}}>Mega</span>
                    <span style={props.size > 75 ? {fontWeight: '900'} : {fontWeight: 'normal'}}>Giga</span>
                </div>
                <button
                    className={styles.lightBtn}
                    onClick={() => { props.setDisplayBoard(true), props.scrollToTop }}>
                    Create Game
            </button>
            </div>
        </>
    )
}

export default AdvancedMenu