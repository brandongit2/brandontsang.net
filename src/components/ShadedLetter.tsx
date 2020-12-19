import {ReactNode} from 'react';

export default function ShadedLetter({children}: {children: ReactNode}) {
    return <span style={{whiteSpace: 'pre'}}>{children}</span>;
}
