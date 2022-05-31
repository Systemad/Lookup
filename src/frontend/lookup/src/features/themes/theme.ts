import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Button from '@mui/material/Button';


export const MainTheme = createTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: "#3cb371",
        },
        secondary: {
            // This is green.A700 as hex.
            main: '#11cb5f',
        },
    },
});