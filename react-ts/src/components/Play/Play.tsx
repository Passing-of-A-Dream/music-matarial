import globaVarlot from "@/state/globaVarlot/globaVarlot";
// import useHomeState from "@/state/useHomeState/useHomeState";
import { Box, Button, Collapse, useTheme } from "@mui/material";
import React from "react";
import { useSnapshot } from "valtio";

interface IProps extends React.HTMLProps<HTMLDivElement> {
    title?: string
}
export default function Play(props: IProps) {
    const theme = useTheme()
    // const snap = useSnapshot(useHomeState)
    const snapGlobaVarlot = useSnapshot(globaVarlot)
    const [isFull, setIsFull] = React.useState(false)
    return (
        <div className={props.className}>
            <Collapse in={snapGlobaVarlot.isPlay}>
                <Box
                    sx={{
                        height: isFull? '100vh' :theme.palette.play.height,
                        bgcolor: 'play.background',
                        borderTopLeftRadius: theme.shape.borderRadius,
                        borderTopRightRadius: theme.shape.borderRadius,
                        transition: theme.transitions.create('height'),
                    }}
                    className="backdrop-blur-2xl overflow-hidden p-2"
                >
                    {props.title}
                    <Button security="private" onClick={() => setIsFull(!isFull)}>full</Button>
                </Box>
            </Collapse>
        </div>
    )
}