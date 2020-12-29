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
                and{' '}
                <a
                    href="https://www.flaticon.com/authors/google"
                    title="Google"
                >
                    Google
                </a>{' '}
                from{' '}
                <a href="https://www.flaticon.com/" title="Flaticon">
                    www.flaticon.com
                </a>
            </p>
            <p>Website by Brandon Tsang</p>
        </div>
    );
}
