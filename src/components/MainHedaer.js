import { AppBar, Toolbar, Button, FormControlLabel, Switch, CssBaseline } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

export function MainHeader({ handleFileChange, handleThemeChange, darkMode }) {
    return (
        <>
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
        </>
    );
}
