import {forwardRef} from 'react';

import styles from './Work.module.scss';
import workStyle from '../../styles/work-card.module.scss';

const Work = forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <div ref={ref} className={styles.container}>
            <h1 className={styles.title}>My Work</h1>
            <div className={styles.content}>
                <div className={workStyle.container}>
                    <div className={workStyle.titleContainer}>
                        <h1 className={workStyle.title}>brandontsang.net</h1>
                    </div>
                    <div
                        className={workStyle.image}
                        style={{backgroundImage: ''}}
                    />
                    <p className={workStyle.description}></p>
                </div>
            </div>
        </div>
    );
});

export default Work;
