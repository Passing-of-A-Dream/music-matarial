import settings from "@/state/settings/settings";
import type { Settings } from "@/state/settings/settings";
import { Box, Button, Card, Dialog, MenuItem, Select, IconButton, Slide, Toolbar, Typography } from "@mui/material";
import { useSnapshot } from "valtio";
import { Viewer } from '@bytemd/react'
import * as React from "react";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from '@mui/icons-material/Close';
import md from '@/files/api.md?raw'
import 'github-markdown-css/github-markdown.css'
import highlight from '@bytemd/plugin-highlight'
import 'highlight.js/styles/xcode.css'

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Settings() {
    const snap = useSnapshot(settings)
    const [open, setOpen] = React.useState(false)
    return (
        <Box className={"p-10 flex flex-col gap-4"}>
            <Typography variant="h5">Settings</Typography>
            <Card variant="outlined" className="p-5 flex flex-row justify-between items-center gap-2">
                <Typography variant="body1">darkMode: {snap.darkMode}</Typography>
                <Select
                    value={snap.darkMode}
                    // label="darkMode"
                    size="small"
                    onChange={(e) => settings.setDarkMode(e.target.value as Settings['darkMode'])}
                    sx={{ borderRadius: '4px', width: '150px' }}>
                    {['light', 'dark', 'system'].map((item) => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                </Select>
            </Card>
            <Card variant="outlined" className="p-5 flex flex-row justify-between items-center gap-2">
                <Typography variant="body1">自定义音源</Typography>
                <Button onClick={() => setOpen(true)}>查看说明</Button>
            </Card>
            <Dialog open={open} fullScreen onClose={() => setOpen(false)} TransitionComponent={Transition}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => setOpen(false)}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Sound
                    </Typography>
                </Toolbar>
                <Box sx={{ p: 2 }}>
                    <Viewer value={md} plugins={[highlight()]} />
                </Box>
            </Dialog>
        </Box>
    )
}