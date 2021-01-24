import {
    forwardRef,
    useContext,
    useImperativeHandle,
    useRef,
    useState
} from 'react';

import {WorkCard} from './';
import styles from './Work.module.scss';
import {ThemeColorContext} from '../../contexts/ThemeColors';
import {useShadow} from '../../hooks/useShadow';
import {remToPixels} from '../../misc/util';
import {ScrollEventsContext} from '../../contexts/ScrollEvents';

const Work = forwardRef<HTMLDivElement>((props, forwardedRef) => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    useImperativeHandle(forwardedRef, () => containerRef.current);

    const [currentSection, setCurrentSection] = useState(-1);

    const {onScroll} = useContext(ScrollEventsContext);

    onScroll(() => {
        // Check if current section has changed
        const newCurrentSection = Math.floor(
            (window.innerWidth / 2 -
                containerRef.current.getBoundingClientRect().x) /
                302
        );
        if (newCurrentSection !== currentSection) {
            setCurrentSection(newCurrentSection);
        }

        // Parallax pan the work cards
        if (newCurrentSection >= 0) {
            contentRef.current.style.left = `${
                -window.innerWidth / 2 + remToPixels(10)
            }px`;

            contentRef.current.style.transform = `translate(${
                -(
                    containerRef.current.getBoundingClientRect().x -
                    window.innerWidth / 2
                ) / 1.5
            }px, 0px)`;
        } else {
            contentRef.current.style.left = '0px';
            contentRef.current.style.transform = 'unset';
        }
    });

    const {back, fore} = useContext(ThemeColorContext);
    const shadow = useShadow(15, 240, fore, back);

    return (
        <div ref={containerRef} className={styles.container}>
            <div ref={contentRef} className={styles.topPart}>
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
