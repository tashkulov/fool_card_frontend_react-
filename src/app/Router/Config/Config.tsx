import {RouteProps} from "react-router-dom"
import HomePage from "../../pages/home-page/home-page.tsx";
import PlayGame from "../../pages/play-game/play-game.tsx";
import NewGame from "../../pages/new-game/new-game.tsx";
import Kwesty from "../../pages/kwesty/kwesty.tsx";

enum AppRoutes {
    HOMEPAGE = "homePage",
    PLAYGAME = "inGame",
    NEWGAME = "newGame",
    KWESTY = "kwesty",

    NOT_FOUND = "not_found",
}

export type AppRouteProps = RouteProps & {}

export const RoutePaths: Record<AppRoutes, string> = {
    [AppRoutes.HOMEPAGE]: "",
    [AppRoutes.PLAYGAME]: "/inGame",
    [AppRoutes.NEWGAME]: "/newGame",
    [AppRoutes.KWESTY]: "/kwesty",
    //last
    [AppRoutes.NOT_FOUND]: "*"
};


export const routerConfig: Record<AppRoutes, AppRouteProps> = {
    [AppRoutes.HOMEPAGE]: {
        path: RoutePaths.homePage,
        element: <HomePage/>
    },
    [AppRoutes.PLAYGAME]: {
        path: RoutePaths.inGame,
        element: <PlayGame/>
    },
    [AppRoutes.NEWGAME]: {
        path: RoutePaths.newGame,
        element: <NewGame/>
    },
    [AppRoutes.KWESTY]: {
        path: RoutePaths.kwesty,
        element: <Kwesty/>
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePaths.not_found,
        element: <div>Not Found</div>
    }
};