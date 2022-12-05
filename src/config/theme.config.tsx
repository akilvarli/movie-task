import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import React from 'react';

type ThemeProp = {
    children: JSX.Element
}

export enum themePalette {
    BG = '#f8f9fd',
    LIME = '#9fcacf',
    BUTTON_BG = '#eef3f7',
    FONT_GLOBAL = "'Roboto', sans-serif"
}

const theme = createTheme({
    palette: {
        mode: "light",
        background: {
            default: themePalette.BG,
        },

        primary: {
            main: themePalette.LIME
        }
    },

    typography: {
        fontFamily: themePalette.FONT_GLOBAL,
    },
    components: {
        MuiButton: {
            defaultProps: {
                style: {
                    textTransform: "capitalize",
                    boxShadow: "none",
                    borderRadius: "0.1em",
                    border: "1px solid #d7e4ea",
                    backgroundColor: themePalette.BUTTON_BG,
                    color: "#1e5479",
                    fontSize: "14px",
                }
            }
        },
        MuiGrid: {
            defaultProps: {
                style: {
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            }
        },
        MuiInput: {
            defaultProps: {
                style: {
                    height: "100%"
                }
            }
        }
    }
})

export const ThemeConfig: React.FC<ThemeProp> = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}