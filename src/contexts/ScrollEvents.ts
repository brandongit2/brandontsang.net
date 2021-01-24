import {createContext} from 'react';

export const ScrollEventsContext = createContext({
    onScroll: (callback: () => void) => {}
});
