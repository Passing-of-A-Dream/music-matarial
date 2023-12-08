import { routes } from '@/router'
import { Box, List, ListItemButton, ListItemText, ThemeProvider, alpha, createTheme, getContrastRatio, useMediaQuery } from '@mui/material'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useRoutes } from 'react-router-dom'
import React, { useEffect, useMemo, useState } from 'react';
import { useSnapshot } from 'valtio';
import Play from '@/components/Play/Play';
import { blue } from '@mui/material/colors';
import settings from '@/state/settings/settings';
import globaVarlot from '@/state/globaVarlot/globaVarlot';

declare module '@mui/material/styles' {
    interface Palette {
        violet: Palette['primary'];
        play: {
            height: number,
            background: string,
            // color: string
        }
    }

    interface PaletteOptions {
        violet?: PaletteOptions['primary'];
    }
}

interface IProps {
}
export default function Layout(_props: IProps) {
    const snapSettings = useSnapshot(settings)
    const snapGlobaVarlot = useSnapshot(globaVarlot)
    const [mode, setMode] = useState<"light" | "dark">('light')
    const theme = useMemo(() => createTheme({
        palette: {
            mode,
        },
        shape: {
            borderRadius: 24
        },
    }), [mode])
    const isDark = useMediaQuery('(prefers-color-scheme: dark)')
    useEffect(() => {
        if (snapSettings.darkMode === 'system') {
            setMode(isDark ? 'dark' : 'light')
        } else {
            setMode(snapSettings.darkMode)
        }
    }, [isDark, snapSettings.darkMode])
    const colorBase = theme.palette.primary.main
    theme.palette.violet = {
        main: alpha(colorBase, 0.7),
        light: alpha(colorBase, 0.5),
        dark: alpha(theme.palette.background.default, 0.9),
        contrastText: getContrastRatio(alpha(colorBase, 0.7), '#fff') < 4.5 ? '#fff' : '#111',
    }
    theme.palette.play = {
        height: 60,
        background: alpha(blue[100], 0.4),
    }
    const themeChange = () => {
        setMode(mode === 'dark' ? 'light' : 'dark')
    }
    const bgStyle: React.CSSProperties = {
        backgroundColor: mode === 'light' ? theme.palette.background.default : alpha(theme.palette.violet.dark, 0.9),
        color: theme.palette.violet.contrastText
    }
    const leftStyle: React.CSSProperties = {
        backgroundColor: mode === 'light' ? alpha(theme.palette.violet.main, theme.palette.action.hoverOpacity) : theme.palette.violet.dark,
        paddingBottom: snapGlobaVarlot.isPlay ? `${theme.palette.play.height + 20}px` : '20px',
        transition: theme.transitions.create('padding-bottom'),
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="h-full w-full flex" style={bgStyle}>
                <section className="w-[250px] md:min-w-[200px] flex items-center flex-col py-5 justify-between" style={leftStyle}>
                    <List className='w-full h-[100%-2.5rem]' sx={{ padding: '0 0.8rem', }}>
                        {snapGlobaVarlot.menu.map((item, index) => {
                            return (
                                <Box key={index} sx={{ borderRadius: theme.shape.borderRadius, overflow: 'hidden' }}>
                                    <ListItemButton
                                        selected={item.router === snapGlobaVarlot.menuChiose}
                                        onClick={() => snapGlobaVarlot.menuSelect(item.router, item.click)}
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
                <section className="w-[calc(100%-250px)] md:w-[calc(100%-150px)] min-w-[800px] overflow-x-hidden">
                    {useRoutes(routes)}
                    <Play className="w-full fixed bottom-0 right-0 z-[99999]" title={isDark ? '深色模式' : '浅色模式'} />
                </section>
            </div>
        </ThemeProvider>
    )
}