import React from 'react';
import styles from './Load.module.css';

const Loader = () => {
    return (
        <div className={styles.loading}>
            <div className={styles.loader}>

                <svg width="200" height="200">
                    <circle
                        className={styles.traco}
                        cx="100"
                        cy="100"
                        r="70"
                        fill="transparent"
                        stroke="#ffe71c"
                        strokeWidth="9"
                        strokeDasharray="35 20"
                        transform="rotate(31 100 100)"
                    ></circle>
                </svg>
                <div className={styles.p1}></div>
                <div className={styles.p2}></div>
                <div className={styles.p3}></div>
                <div className={styles.p4}></div>
                <div className={styles.p5}></div>
                <div className={styles.p6}></div>
                <div className={styles.p7}></div>
                <div className={styles.p8}></div>
                <div className={styles.circle}>
                    <div className={styles.content}>
                        <div className={styles.eyes}>
                            <div className={styles.eyeLeft}></div>
                            <div className={styles.eyeRight}></div>
                        </div>
                        <div className={styles.nouse}></div>
                        <div className={styles.mouth}></div>
                        <div className={styles.teeth}>
                            <div className={styles.tooth}></div>
                            <div className={styles.tooth}></div>
                            <div className={styles.tooth}></div>
                            <div className={styles.tooth}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
