import { Box } from "@mui/material";
import Header from "./components/Header";
import PlayList from "./components/RecomPlayList";
import NewSong from "./components/NewSong";

export default function Home() {

    return (
        <div className="w-full h-full p-5">
            <Box>
                <Header />
            </Box>
            <Box className="mt-10">
                <PlayList />
                <NewSong />
            </Box>
        </div>
    )
}