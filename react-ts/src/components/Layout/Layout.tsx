import { routes } from '@/router'
import { Box, List, ListItemButton, ListItemText, ThemeProvider, alpha, createTheme, getContrastRatio } from '@mui/material'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useRoutes } from 'react-router-dom'
import React, { useMemo, useState } from 'react';
import useHomeState from '@/state/useHomeState/useHomeState';
import { useSnapshot } from 'valtio';

declare module '@mui/material/styles' {
    interface Palette {
        violet: Palette['primary'];
    }

    interface PaletteOptions {
        violet?: PaletteOptions['primary'];
    }
}

interface IProps {

}

export default function Layout(_props: IProps) {
    const snap = useSnapshot(useHomeState)
    const [mode, setMode] = useState<"light" | "dark">('light')
    const theme = useMemo(() => createTheme({
        palette: {
            mode,
        },
        shape: {
            borderRadius: 24
        },
    }), [mode])
    const colorBase = theme.palette.primary.main
    theme.palette.violet = {
        main: alpha(colorBase, 0.7),
        light: alpha(colorBase, 0.5),
        dark: alpha(theme.palette.background.default, 0.9),
        contrastText: getContrastRatio(alpha(colorBase, 0.7), '#fff') < 4.5 ? '#fff' : '#111',
    }
    const themeChange = () => {
        if (mode === 'light') {
            setMode('dark')
        } else {
            setMode('light')
        }
    }
    const bgStyle: React.CSSProperties = {
        backgroundColor: mode === 'light' ? theme.palette.background.default : alpha(theme.palette.violet.dark, 0.9),
        color: theme.palette.violet.contrastText
    }
    const leftStyle: React.CSSProperties = {
        backgroundColor: mode === 'light' ? alpha(theme.palette.violet.main, theme.palette.action.hoverOpacity) : theme.palette.violet.dark,
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="h-full w-full flex" style={bgStyle}>
                <section className="w-1/6 min-w-[250px] flex items-center flex-col py-5 justify-between" style={leftStyle}>
                    <List className='w-full h-[100%-2.5rem]' sx={{ padding: '0 0.8rem', }}>
                        {snap.menu.map((item, index) => {
                            return (
                                <Box key={index} sx={{ borderRadius: theme.shape.borderRadius, overflow: 'hidden' }}>
                                    <ListItemButton
                                        selected={item.router === snap.menuChiose}
                                        onClick={() => snap.menuSelect(item.router)}
                                    >
                                        <ListItemText sx={{ textAlign: 'center' }}>{item.name}</ListItemText>
                                    </ListItemButton>
                                </Box>
                            )
                        })}
                    </List>
                    <div
                        className='h-10 w-10 outline outline-1 rounded-[50%] click overflow-hidden'
                        onClick={() => themeChange()} style={{ outlineColor: theme.palette.primary.main }}>
                        <div
                            className='w-full h-20 grid col-span-2 place-items-center transition-all'
                            style={{ transform: theme.palette.mode === 'dark' ? 'rotate(180deg)' : '' }}
                        >
                            <DarkModeOutlinedIcon color='primary' />
                            <LightModeOutlinedIcon color='primary' />
                        </div>
                    </div>
                </section>
                <section className="w-5/6 min-w-[800px] overflow-x-hidden">{useRoutes(routes)}</section>
            </div>
        </ThemeProvider>
    )
}