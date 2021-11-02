import React, { useState } from 'react'
import styles from './minesweeper.module.css'

const Space = (props) => {

    let bgcolor = () => {
        if(!props.gameStillActive) {
            return '#B44'
        } else if(props.active) {
            return '#484'
        } else return 
    }

    return (
        <button
            bgColor={props.bgColor}
            className={props.spaceClass}
            id={props.id}
            style={{
                backgroundColor: props.active ? '#B44' : '#484',
                width: props.spaceSize+'rem',
                height: props.spaceSize+'rem',
            }}
            onContextMenu={props.handleLeftClick}
            onClick={props.handleClick}
        >
            {props.spaceContent}
        </button>
    )

}

export default Space