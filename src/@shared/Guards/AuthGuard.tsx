import { GeneralProps } from "../Models/Common";
import {Navigate, Outlet} from "react-router-dom";


export default function AuthGuard (props: GeneralProps) {
    return <Navigate to="/"/>
}
