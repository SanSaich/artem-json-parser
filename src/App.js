import React, { useState } from 'react';
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
    Chip,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';
import { CssBaseline, Container, Switch, AppBar, Toolbar, Button, FormControlLabel } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import 'react-json-view-lite/dist/index.css';

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [jsonData, setJsonData] = useState(null);
    const [tab, setTab] = useState(0);

    const handleThemeChange = () => {
        setDarkMode(!darkMode);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target.result);
                    setJsonData(json);
                    console.log(json);
                } catch (error) {
                    console.error('Ошибка при парсинге JSON:', error);
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <input
                        accept=".json"
                        style={{ display: 'none' }}
                        id="upload-json"
                        type="file"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="upload-json">
                        <Button color="inherit" component="span">
                            Загрузить JSON
                        </Button>
                    </label>
                    <div style={{ flexGrow: 1 }} />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={darkMode}
                                onChange={handleThemeChange}
                                color="default"
                                icon={<Brightness7 />}
                                checkedIcon={<Brightness4 />}
                            />
                        }
                    />
                </Toolbar>
            </AppBar>
            <Container>
                {/* {jsonData && (
                    <JsonView
                        data={jsonData}
                        shouldExpandNode={collapseAllNested}
                        style={darkMode ? jsonViewStyles.dark : jsonViewStyles.light}
                    />
                )} */}
                {jsonData && (
                    <Box sx={{ p: 4 }}>
                        <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
                            <Tab label="RAID" />
                            <Tab label="Сеть" />
                            <Tab label="Диски" />
                            <Tab label="Сенсоры" />
                        </Tabs>
                        {tab === 0 && (
                            <Paper sx={{ p: 2, mt: 2 }}>
                                <Typography variant="h6">RAID</Typography>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Название</TableCell>
                                            <TableCell>Уровень</TableCell>
                                            <TableCell>Статус</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Object.entries(jsonData.raid).map(([key, value]) => (
                                            <TableRow key={key}>
                                                <TableCell>{value.name}</TableCell>
                                                <TableCell>{value.level}</TableCell>
                                                <TableCell>
                                                    <Chip status={value.status} />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        )}
                        {tab === 1 && (
                            <Paper sx={{ p: 2, mt: 2 }}>
                                <Typography variant="h6">Сеть</Typography>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Интерфейс</TableCell>
                                            <TableCell>IP</TableCell>
                                            <TableCell>Статус</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Object.entries(jsonData.network.interface).map(([key, value]) => (
                                            <TableRow key={key}>
                                                <TableCell>{value.name}</TableCell>
                                                <TableCell>{value.ipaddr || 'N/A'}</TableCell>
                                                <TableCell>
                                                    <Chip status={value.running ? 'ok' : 'error'} />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        )}
                    </Box>
                )}
            </Container>
        </ThemeProvider>
    );
}

export default App;
