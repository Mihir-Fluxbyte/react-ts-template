import { GeneralProps } from "../Models/Common";
import {Navigate, Outlet} from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../contextApi/AuthContext";


export default function AuthGuard (props: GeneralProps<unknown>) {
    const auth = useContext(AuthContext)
    if(auth?.state.isAuthenticated) {
        if(props.children) return <>{props.children}</>
        return <Outlet />
    }
    return <Navigate to="/"/>
}
