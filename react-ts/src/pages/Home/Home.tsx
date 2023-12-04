import { Box } from "@mui/material";
import Header from "./components/Header";
import Main from "./components/Main";

export default function Home() {

    return (
        <div className="w-full h-full p-5">
            <Box>
                <Header />
            </Box>
            <Box className="mt-10">
                <Main />
            </Box>
        </div>
    )
}