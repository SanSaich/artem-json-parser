import React, { useState, useEffect } from 'react';
import {
    Box,
    Tabs,
    Tab,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    Paper,
    Container,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';
import 'react-json-view-lite/dist/index.css';
import { TRANSLATIONS } from './consts/tabs';
import { useGetData } from './hooks/useGetData';
import { MainHeader } from './components/MainHedaer';

function App() {
    const { jsonData, uploadJSON } = useGetData();

    const [darkMode, setDarkMode] = useState(false);
    const [keys, setKeys] = useState([]);
    const [tab, setTab] = useState('');

    useEffect(() => {
        if (jsonData) {
            console.log(jsonData);

            const jsonKeys = Object.keys(jsonData);
            setKeys(jsonKeys);
            setTab(jsonKeys.filter((key) => contentMap[key])[0] || '');
        }
    }, [jsonData]);

    const handleThemeChange = () => {
        setDarkMode(!darkMode);
    };

    const handleFileChange = (event) => {
        uploadJSON(event);
    };

    const renderTable = (data, columns) => {
        if (typeof data !== 'object') {
            console.error('Expected data to be an object, but got:', typeof data);
            return (
                <Typography variant="body2" color="textSecondary">
                    Неверный формат данных.
                </Typography>
            );
        }

        const rows = Object.values(data);

        return (
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((col) => (
                            <TableCell key={col}>{col}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            {columns.map((col) => (
                                <TableCell key={col}>{row[col] || 'N/A'}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    };

    const contentMap = {
        raid: {
            title: TRANSLATIONS.raid,
            columns: ['name', 'level', 'status'],
        },
        network: {
            title: TRANSLATIONS.network,
            columns: ['name', 'ipaddr', 'running'],
        },
        drive: {
            title: TRANSLATIONS.drive,
            columns: ['id', 'model', 'type', 'slot'],
        },
        sensors: {
            title: TRANSLATIONS.sensors,
            columns: ['id', 'name', 'sensor_reading', 'status'],
        },
        lun: {
            title: TRANSLATIONS.lun,
            columns: ['id', 'name', 'type', 'status'],
        },
        system: {
            title: TRANSLATIONS.system,
            columns: ['version', 'name', 'status'],
        },
        volume: {
            title: TRANSLATIONS.volume,
            columns: ['id', 'level', 'size'],
        },
    };

    const renderContent = () => {
        if (!jsonData) return null;

        console.log(jsonData[tab]);

        if (!contentMap[tab]) {
            // Если вкладка отсутствует в contentMap, выводим jsonData[tab]
            return (
                <Paper sx={{ p: 2, mt: 2 }}>
                    <Typography variant="h6">{TRANSLATIONS[tab] || tab}</Typography>
                    <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                        {JSON.stringify(jsonData[tab], null, 2)}
                    </pre>
                </Paper>
            );
        }

        const { title, columns } = contentMap[tab];
        return (
            <>
                <Paper sx={{ p: 2, mt: 2 }}>
                    <Typography variant="h6">{title}</Typography>
                    {renderTable(jsonData[tab], columns)}
                </Paper>

                <Paper sx={{ p: 2, mt: 2 }}>
                    <Typography variant="h6">{title}</Typography>
                    <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                        {JSON.stringify(jsonData[tab], null, 2)}
                    </pre>
                </Paper>
            </>
        );
    };

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <MainHeader handleFileChange={handleFileChange} handleThemeChange={handleThemeChange} darkMode={darkMode} />
            <Container>
                {jsonData && (
                    <Box sx={{ p: 4 }}>
                        <Tabs
                            value={tab}
                            onChange={(e, newValue) => setTab(newValue)}
                            variant="standart"
                            scrollButtons="false"
                        >
                            {keys
                                .filter((key) => contentMap[key])
                                .map((key) => {
                                    const isDisabled = !jsonData[key] || Object.keys(jsonData[key]).length === 0;
                                    return (
                                        <Tab
                                            key={key}
                                            label={TRANSLATIONS[key] || key}
                                            value={key}
                                            disabled={isDisabled}
                                        />
                                    );
                                })}
                        </Tabs>
                        {renderContent()}
                    </Box>
                )}
            </Container>
        </ThemeProvider>
    );
}

export default App;
