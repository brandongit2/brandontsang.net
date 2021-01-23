import {forwardRef, useContext, useEffect, useRef, useState} from 'react';

import {WorkCard} from './';
import styles from './Work.module.scss';
import {ThemeColorContext} from '../../contexts/ThemeColors';
import {useShadow} from '../../hooks/useShadow';
import indexStyles from '../../pages/index.module.scss';

const Work = forwardRef<HTMLDivElement>((props, forwardedRef) => {
    const ref = useRef(null);

    const [currentSection, setCurrentSection] = useState(-1);

    useEffect(() => {
        const scroller = document.getElementsByClassName(
            indexStyles.scroller
        )[0];

        function handleScroll() {
            const newCurrentSection = Math.floor(
                (window.innerWidth / 2 -
                    ref.current.getBoundingClientRect().x) /
                    302
            );
            if (newCurrentSection !== currentSection) {
                setCurrentSection(newCurrentSection);
            }
        }

        scroller.addEventListener('scroll', handleScroll);
        return () => {
            scroller.removeEventListener('scroll', handleScroll);
        };
    }, [currentSection]);

    const {back, fore} = useContext(ThemeColorContext);
    const shadow = useShadow(15, 240, fore, back);

    return (
        <div ref={forwardedRef} className={styles.container}>
            <div ref={ref} className={styles.topPart}>
                <div className={styles.myWorkContainer}>
                    <h1 className={styles.myWork} style={{textShadow: shadow}}>
                        My Work
                    </h1>
                </div>
                <div className={styles.workCards}>
                    <WorkCard
                        title="brandontsang.net"
                        expanded={currentSection === 0}
                    />
                    <WorkCard
                        title="Finance manager"
                        expanded={currentSection === 1}
                    />
                    <WorkCard
                        title="Recipe book"
                        expanded={currentSection === 2}
                    />
                    <WorkCard
                        title="Frogdromeda"
                        expanded={currentSection === 3}
                    />
                </div>
            </div>
            <div className={styles.hints}>
                <span
                    className={`${styles.hint} ${
                        currentSection === 0 ? styles.highlighted : ''
                    }`}
                >
                    brandontsang.net
                </span>
                <span
                    className={`${styles.hint} ${
                        currentSection === 1 ? styles.highlighted : ''
                    }`}
                >
                    Finance manager
                </span>
                <span
                    className={`${styles.hint} ${
                        currentSection === 2 ? styles.highlighted : ''
                    }`}
                >
                    Recipe book
                </span>
                <span
                    className={`${styles.hint} ${
                        currentSection === 3 ? styles.highlighted : ''
                    }`}
                >
                    Frogdromeda
                </span>
            </div>
        </div>
    );
});

export default Work;
