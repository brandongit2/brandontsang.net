import Head from 'next/head';

import styles from './index.module.scss';
import {Title, Footer} from '../components/homepage';

export default function Index() {
    return (
        <div className={styles['page-container']}>
            <Head>
                <title>Brandon Tsang</title>
            </Head>
            <style jsx global>{`
                html {
                    height: 100%;
                }

                body {
                    --background-color: #ffc5cd;
                    --foreground-color: #006600;

                    font-family: mostra-nuova;
                    background: var(--background-color);
                    height: 100%;
                }

                #__next {
                    height: 100%;
                    display: inline-block;
                }
            `}</style>
            <Title />
            <Footer />
        </div>
    );
}
