import {getPersonalized} from "@/api/Home"
import {Card, CardContent, CardMedia, Popover, Typography, alpha, useTheme, Box} from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import * as React from "react"
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import type {PersonalizedResult} from "@/api/Home.d";

export default function Main() {
    const {palette, shape} = useTheme()
    // hooks
    React.useEffect(() => {
        getPersonalizedList()
    }, [])
    // personalized
    const [personalized, setPersonalized] = React.useState<PersonalizedResult[]>()
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

    // Retrieves a personalized list.
    const getPersonalizedList = () => {
        getPersonalized().then((res) => {
            setPersonalized(res.result)
        }).finally(() => setRenew(false))
    }

    // Renews the personalized list
    const renewPersonalized = () => {
        setRenew(true)
        setTimeout(() => {
            getPersonalizedList()
        }, 1000)
    }

    return (
        <div className="w-full px-8">
            <Box className={'flex item-center'}>
                <Typography variant="h5" mb={2}>推荐歌单</Typography>
                <Box aria-owns={open ? 'mouse-over-popover' : undefined}
                     aria-haspopup="true"
                     onMouseEnter={handlePopoverOpen}
                     onMouseLeave={handlePopoverClose}
                     className={'ml-2'}>
                    <AutorenewOutlinedIcon
                        className={`cursor-pointer ${renew ? 'animate-spin' : ''}`}
                        onClick={() => renewPersonalized()}
                    ></AutorenewOutlinedIcon>
                    <span className={'opacity-0 w-0 block h-0'}>刷新歌单</span>
                </Box>
            </Box>
            <Grid2 container spacing={3} columns={10}>
                {personalized?.map((item, index: number) => {
                    return (
                        <Grid2 key={index} xs={2}>
                            <Card
                                sx={{
                                    maxWidth: "100%",
                                    '&:hover': {backgroundColor: alpha(palette.primary.main, palette.action.selectedOpacity)}
                                }}
                                variant="elevation"
                                className="cursor-pointer"
                                aria-owns={open ? 'mouse-over-popover' : undefined}
                                aria-haspopup="true"
                                onMouseEnter={handlePopoverOpen}
                                onMouseLeave={handlePopoverClose}>
                                <CardMedia
                                    component="img"
                                    image={item.picUrl}
                                    sx={{
                                        height: 200,
                                        borderBottomLeftRadius: shape.borderRadius,
                                        borderBottomRightRadius: shape.borderRadius
                                    }}/>
                                {/* <img src={item.picUrl} alt="" /> */}
                                {/* <p>{item.name}</p> */}
                                <CardContent sx={{padding: 1}}>
                                    {/* <Box>
                                        <img src={item.picUrl} alt="" />
                                    </Box> */}
                                    <Typography
                                        variant="body1"
                                        noWrap
                                        textOverflow={"ellipsis"}
                                        overflow={"hidden"}
                                        sx={{
                                            userSelect: "none",
                                        }}
                                    >{item.name}</Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                    )
                })}
            </Grid2>
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