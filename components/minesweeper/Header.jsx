import React, { useState } from 'react';
import { motion } from 'framer-motion';

import styles from './minesweeper.module.css'

const Header = () => {

    const [displayInstructions, setDisplayInstructions] = useState(false)

    return (
        <>
            <div className={styles.header}>
                <motion.h2
                    animate={{
                        opacity: [1, 0.9, 1, 0.93, 1, 1, 1, 0.9, 1, 1, 0.97],
                        transition: {
                            duration: 1.5,
                            delay: 3.0,
                            repeat: Infinity,
                            stiffness: 1,
                        },
                    }}
                >{'<Virus_Sweeper>'}</motion.h2>
                <motion.span
                    animate={{
                        color: ['#4B4', '#8F8', '#F44', '#f88', '#88F', '#8F8', '#4B4'],
                        transition: {
                            duration: 4,
                            repeat: Infinity,
                            stiffness: 1,
                        },
                    }}
                >Attack of the RetroVirus</motion.span>
            </div>

            {displayInstructions ? <motion.button whileTap={{ color: '#BFB' }} 
                onClick={() => setDisplayInstructions(false)}
                className={styles.mediumBtn}
            >Hide Instructions</motion.button> :
                <motion.button whileTap={{ color: '#BFB' }} 
                    onClick={() => setDisplayInstructions(true)}
                    className={styles.mediumBtn}
                >Show Instructions</motion.button>
            }

            {displayInstructions && <div className={styles.helpModal}>
                <p>Welcome to VirusSweeper! A remake of Microsoft's MineSweeper</p>
                <p>
                    In this game your job is to find and isolate every single virus on a memory card, which is comprised of a grid of 'memory blocks'.
                    Each memory card will have a different number of memory blocks and bugs, depending on which difficulty level and card size you choose to clean.
                </p>
                <p>
                    Viruses need to be isolated in order to stop them from infecting the rest of the card, which could go on to infect the rest of the computer, and then... maybe even the entire internet. 
                </p>
                <p>
                    Oh my.
                </p>
                <p>You'd better find and isolate every single virus!</p>
                <p>
                    To isolate a virus, you will need to right-click (or tap AND hold, for those on mobile devices) the memory block that you believe is hiding a virus.
                    But how can you tell which memory blocks might contain viruses?
                </p>
                <p>
                    Every memory block begins red. This red colour indicates that a given memory block is at risk of containing a virus.
                    Luckily, you've got the most advanced, cutting edge anti-virus software built right into your mouse click. Simply left-clicking (or a single quick tap if you're using a mobile device) on a memory block will run the anti-virus software.
                    The anti-virus software will verify that any memory block you click on is clean and virus free, turning the memory block from red to green.
                </p>
                <p>Once a block is green, you can rest assured it's clean.</p>
                <p>
                    But that's not all! If you run the anti-virus software on a memory block that isn't infected, it will then go on to check EVERY SINGLE MEMORY BLOCK surrounding itself -
                    not only those above, below and beside, but also those that are immediately diagonal from the memory block as well!
                </p>
                <p>
                    The anti-virus software will repeat this process and expand it's reach until it reaches a potential virus.
                    Rather than continuing to scan (and potentially unleashing the virus), the anti-virus program will then stop and display the number of infected memory blocks it is currently adjacent to.
                    So, for example, if after running the software you see a memory block that has a "2" in it, that means that block is currently touching 2 infected blocks.
                </p>
                <p>
                    However, BEWARE!!! If you run the anti-virus software (by left-clicking) on a memory block that contains a virus, you'll infect the whole computer... and, as mentioned before, probably the whole world. Great job.
                </p>
                <p>
                    For this reason, you'll need to use a combination of the anti-virus software (the left-click/tap) and your isolation ability (right-click/tap and hold) to identify and properly isolate each virus on the card. Once you've isolated every single virus, you win!
                </p>
                <p>Good luck! The fate of the internet is in your hands...</p>
            </div>
            }

        </>
    )
}

export default Header