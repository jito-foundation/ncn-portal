import { useContext } from "react";

import { ThemeContext } from "./ThemeContext";
import { UseThemeProps } from "./interface";

/* eslint-disable @typescript-eslint/no-unused-vars */
const defaultContext: UseThemeProps = { setTheme: (_) => {}, themes: [] };

export const useTheme = () => useContext(ThemeContext) ?? defaultContext;
