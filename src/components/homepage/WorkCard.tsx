import styles from './WorkCard.module.scss';

interface PropTypes {
    expanded?: boolean;
    title: string;
}

export default function WorkCard({title, expanded = false}: PropTypes) {
    return (
        <div
            className={`${styles.container} ${expanded ? styles.expanded : ''}`}
        >
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>{title}</h1>
            </div>
            <div className={styles.content}></div>
        </div>
    );
}
