import styles from './Footer.module.scss';

export default function Footer() {
    return (
        <div className={styles.container}>
            <p>
                Icons made by{' '}
                <a
                    href="https://www.flaticon.com/authors/freepik"
                    title="Freepik"
                >
                    Freepik
                </a>{' '}
                from{' '}
                <a href="https://www.flaticon.com/" title="Flaticon">
                    www.flaticon.com
                </a>
            </p>
        </div>
    );
}
