import Color from "color";
import {createContext} from "react";

export const ThemeColorContext = createContext({
    back: Color(),
    fore: Color(),
});
