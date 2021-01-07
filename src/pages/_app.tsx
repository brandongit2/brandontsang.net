import {AppProps} from 'next/app';
import {FirebaseAppProvider} from 'reactfire';

import './_app.scss';

const firebaseConfig = {
    apiKey: 'AIzaSyCxCqQ3tMjELwyXyVUuxG74gorGC2CRudM',
    authDomain: 'brandontsang-net.firebaseapp.com',
    projectId: 'brandontsang-net',
    storageBucket: 'brandontsang-net.appspot.com',
    messagingSenderId: '903224799056',
    appId: '1:903224799056:web:cb76f775e575ab365f0655',
    measurementId: 'G-G39ZLTRJXV'
};

function MyApp({Component, pageProps}: AppProps) {
    return (
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
            <Component {...pageProps} />
        </FirebaseAppProvider>
    );
}

export default MyApp;
