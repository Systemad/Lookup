import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Button from '@mui/material/Button';


export const MainTheme = createTheme({
    palette: {
        primary: {
            main: "#3cb371",
        },
        secondary: {
            main: '#11cb5f',
        }
    },
});