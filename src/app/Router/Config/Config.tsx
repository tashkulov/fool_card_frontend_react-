import {RouteProps} from "react-router-dom"
import HomePage from "../../pages/home-page/home-page.tsx";
import PlayGame from "../../pages/play-game/play-game.tsx";
import Kvesty from "../../pages/kwesty/Kvesty.tsx";
import {LeaderBoard} from "../../pages/LeaderBoard";
import NewGame from "../../pages/new-game/new-game.tsx";

enum AppRoutes {
    HOMEPAGE = "homePage",
    PLAYGAME = "inGame",
    KVESTY = "kvesty",
    LEADERBOARD = "leaderBoard",
    NEWGAME = "newGame",
    NOT_FOUND = "not_found",
}

export type AppRouteProps = RouteProps &NonNullable<unknown>

export const RoutePaths: Record<AppRoutes, string> = {
    [AppRoutes.HOMEPAGE]: "",
    [AppRoutes.PLAYGAME]: "/inGame",
    [AppRoutes.KVESTY]: "/kvesty",
    [AppRoutes.LEADERBOARD]: "/leaderBoard",
    [AppRoutes.NEWGAME]: "/newGame",
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

    [AppRoutes.KVESTY]: {
        path: RoutePaths.kvesty,
        element: <Kvesty/>
    },
    [AppRoutes.LEADERBOARD]: {
        path: RoutePaths.leaderBoard,
        element: <LeaderBoard/>
    },
    [AppRoutes.NEWGAME]: {
        path: RoutePaths.newGame,
        element: <NewGame/>
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePaths.not_found,
        element: <div>Not Found</div>
    }
};
