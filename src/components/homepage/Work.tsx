import {forwardRef} from 'react';

import styles from './Work.module.scss';

const Work = forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <div ref={ref} className={styles.container}>
            <h1>My Work</h1>
        </div>
    );
});

export default Work;
