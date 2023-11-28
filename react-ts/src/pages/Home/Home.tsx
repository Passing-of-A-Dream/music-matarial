import { Button, Card, CardContent } from "@mui/material";
import Header from "./Header";


export default function Home() {

    return (
        <div className="w-full h-full p-5">
            <Header />
            <Card variant="outlined" className="cursor-pointer">
                <CardContent>
                    Home页面
                    <Button variant="outlined">按钮</Button>
                </CardContent>
            </Card>
        </div>
    )
}