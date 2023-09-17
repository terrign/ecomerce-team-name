import { createContext } from 'react';

export interface ThemeContext {
  dark: boolean;
  setDark?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Theme = createContext<ThemeContext>({
  dark: false,
});

export default Theme;
