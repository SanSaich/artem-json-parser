import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#ffffff',
            paper: '#f5f5f5',
        },
        text: {
            primary: '#000000',
            secondary: '#555555',
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#f48fb1',
        },
        background: {
            default: '#121212',
            paper: '#424242',
        },
        text: {
            primary: '#ffffff',
            secondary: '#aaaaaa',
        },
    },
});

export const jsonViewStyles = {
    light: {
        container: {
            backgroundColor: '#ffffff',
            color: '#000000',
        },
        label: {
            color: '#000000',
        },
        stringValue: {
            color: '#d32f2f',
        },
        numberValue: {
            color: '#1976d2',
        },
        booleanValue: {
            color: '#388e3c',
        },
        nullValue: {
            color: '#f57c00',
        },
    },
    dark: {
        container: 'json-color',
        label: 'json-color',
        // expandIcon: 'json-bg',
        // collapseIcon: 'json-bg',
        stringValue: 'json-color',
        numberValue: 'json-color',
        booleanValue: 'json-color',
        nullValue: 'json-color',

        basicChildStyle: 'json-color',
        clickableLabel: 'json-color',
        undefinedValue: 'json-color',
        otherValue: 'json-color',
        // punctuation: 'json-color',
        // collapsedContent: 'json-color',
        childFieldsContainer: 'json-color',

        // noQuotesForStringValues: true,
        // quotesForFieldNames: true,
    },
};
