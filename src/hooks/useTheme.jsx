import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext/ThemeContext';

const useTheme = () => {
    const themeInfo = useContext(ThemeContext);
    return themeInfo;
};

export default useTheme;