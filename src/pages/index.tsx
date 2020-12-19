import Head from 'next/head';
import {useState} from 'react';

import styles from './index.module.scss';
import ShadedLetter from '../components/ShadedLetter';

export default function Home() {
    const [text, setText] = useState('Click to edit me!');

    return (
        <div className={styles.container}>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://use.typekit.net/lni7lly.css"
                />
            </Head>
            <div style={{position: 'relative'}}>
                <input
                    className={`${styles.title} ${styles.input}`}
                    value={text}
                    onInput={(evt: React.ChangeEvent<HTMLInputElement>) => {
                        setText(evt.target.value);
                    }}
                />
                <h1 className={`${styles.title} ${styles.display}`}>
                    {text.split('').map((letter) => (
                        <ShadedLetter>{letter}</ShadedLetter>
                    ))}
                </h1>
            </div>
        </div>
    );
}
