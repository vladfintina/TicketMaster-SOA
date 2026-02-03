import {createBrowserRouter} from "react-router-dom";
import LoginPage from "./LoginPage.tsx";
import MatchesList from "./MatchesList.tsx";
import MatchDetailsPage from "./MatchDetailsPage.tsx";

export const router = createBrowserRouter([{path: "/login", Component: LoginPage}, {path: "/", Component: MatchesList}, {path:"/matches/:matchId", Component: MatchDetailsPage}])