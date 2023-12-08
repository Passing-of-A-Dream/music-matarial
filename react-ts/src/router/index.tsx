import type { RouteObject } from "react-router-dom"
import Home from "@/pages/Home/Home"
import Explore from "@/pages/Explore/Explore"
import Settings from "@/pages/Settings/Settings"

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/explore',
    element: <Explore />,
  },
  {
    path: '/settings',
    element: <Settings />,
  }
]