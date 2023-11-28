import { routes } from '@/router'
import { ThemeProvider, alpha, createTheme, getContrastRatio, styled } from '@mui/material'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useRoutes } from 'react-router-dom'
import { useMemo, useState } from 'react';
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
    const colorBase = theme.palette.background.default
    theme.palette.violet = {
        main: alpha(colorBase, 0.7),
        light: alpha(colorBase, 0.5),
        dark: alpha(colorBase, 0.9),
        contrastText: getContrastRatio(alpha(colorBase, 0.7), '#fff') > 4.5 ? '#fff' : '#111',
    }
    const themeChange = () => {
        if (mode === 'light') {
            setMode('dark')
        } else {
            setMode('light')
        }
    }
    const bgStyle: React.CSSProperties = {
        backgroundColor: mode === 'light' ? alpha(theme.palette.violet.main, 0.1) : theme.palette.violet.dark,
        color: theme.palette.violet.contrastText
    }
    const MenuStyle = styled('li',)<{ path?: string }>((props) => ({
        color: theme.palette.text.primary,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: props.path === snap.menuChiose ? theme.palette.action.selected : '',
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    }))

    return (
        <ThemeProvider theme={theme}>
            <div className="h-full w-full flex" style={bgStyle}>
                <section className="w-1/6 min-w-[250px] flex items-center flex-col py-10 justify-between">
                    <ul className='w-full h-[100%-2.5rem] px-10'>
                        {snap.menu.map((item, index) => {
                            return <MenuStyle key={index} path={item.router}
                                className="click w-full text-center py-3 transition-all"
                                onClick={() => snap.menuSelect(item.router)}
                            >{item.name}
                            </MenuStyle>
                        })}
                    </ul>
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
                <section className="w-5/6 min-w-[800px]">{useRoutes(routes)}</section>
            </div>
        </ThemeProvider>
    )
}