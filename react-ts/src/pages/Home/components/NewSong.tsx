import {Popover, Typography, alpha, useTheme, Box} from "@mui/material"
import * as React from "react"
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';

export default function NewSong() {
    const {palette, shape} = useTheme()
    // hooks
    React.useEffect(() => {
    }, [])
    // element of popover
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    // popover text
    const [popoverText, setPopoverText] = React.useState('')
    // renew personalized
    const [renew, setRenew] = React.useState(false)
    // state of popover
    const open = Boolean(anchorEl);

    // open popover
    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setPopoverText(event.currentTarget.innerText)
    };

    // close popover
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="w-full px-8 pb-4">
            <Box className={'flex item-center'}>
                <Typography variant="h5" mb={2}>推荐歌曲</Typography>
                <Box aria-owns={open ? 'mouse-over-popover' : undefined}
                     aria-haspopup="true"
                     onMouseEnter={handlePopoverOpen}
                     onMouseLeave={handlePopoverClose}
                     className={'ml-2'}>
                    <AutorenewOutlinedIcon
                        className={`cursor-pointer ${renew ? 'animate-spin' : ''}`}
                    ></AutorenewOutlinedIcon>
                    <span className={'opacity-0 w-0 block h-0'}>刷新歌曲</span>
                </Box>
            </Box>
            
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                    '& .MuiPopover-paper': {
                        bgcolor: alpha(palette.background.default, 0.7),
                        backdropFilter: 'blur(10px)',
                    }
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography sx={{p: 1}}>{popoverText}</Typography>
            </Popover>
        </div>
    )
}