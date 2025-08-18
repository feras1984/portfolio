import {PropsWithChildren, useEffect, useMemo} from "react";
import {useAppSelector} from "@/Redux/Store/hook";
import {dark} from "@mui/material/styles/createPalette";
import {createTheme, useTheme, ThemeProvider, Direction, CssBaseline} from "@mui/material";
import {indigo, pink, purple, lime, green, lightGreen, red, teal} from "@mui/material/colors";
import netflix from "../fonts/NetflixSans-Regular.woff2";
import netflixBold from "../fonts/NetflixSans-Bold.woff2";
import netflixLight from "../fonts/NetflixSans-Light.woff2";
import netflixMedium from "../fonts/NetflixSans-Medium.woff2";
import trebuchet from "../fonts/TrebuchetMS.ttf";

const SiteAppRoot = ({children, lang} : PropsWithChildren<{lang: string}>) => {
    const themeMode = useAppSelector(state => state.siteTheme.mode);
    const dark = useAppSelector(state => state.siteTheme.dark);

    // const lang = usePage().props.lang;
    // const languages = usePage().props.settings.languages;
    // console.log('lang: ', lang);
    // console.log('languages: ', languages);

    const theme = useMemo( () => createTheme({
        // direction: (document.dir || 'ltr') as Direction,
        palette: {
            mode: themeMode,
            ...(dark) ? {
                primary: {
                    main: '#3d5afe',
                },
                secondary: {
                    main: '#e02027',
                },
                info: {
                    main: green[900],
                },
                text: {
                    primary: '#ddefee',
                },
                action: {
                    active: '#ddefee',
                },
                background: {
                    default: '#242424',
                    paper: '#242424',
                },
                activate: {
                    main: lightGreen["A400"],
                },

                deactivate: {
                    main: pink["A400"],
                },

            } : {
                primary: {
                    main: '#2a3eb1',
                },
                secondary: {
                    main: '#e02027',
                },
                info: {
                    main: green[900],
                },
                text: {
                    primary: '#231f20',
                },
                action: {
                    active: '#231f20',
                },
                background: {
                    default: '#fff',
                    paper: '#fff',
                },
                activate: {
                    main: green[700],
                },
                deactivate: {
                    main: red[900],
                },
            }
        },

        typography: {
            fontFamily: [
                'trebuchet',
                'Sans',
                '"Helvetica Neue"',
                '"Segoe UI"',
                'Roboto',
                'Ubuntu',
                'sans-serif'
            ].join(','),
        },

        components: {
            MuiCssBaseline: {
                styleOverrides: `
        @font-face {
          font-family: 'trebuchet';
          font-style: regular;
          font-display: swap;
          font-weight: 500;

          src: url(${trebuchet}) format('ttf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
            },
        },
    }), [themeMode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
export default SiteAppRoot;
