import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Layout from "./@shared/layout/Layout";
import AuthGuard from "./@shared/Guards/AuthGuard";
import Dashboard from "./components/dashboard/Dashboard";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route element={<Layout />}>
                    <Route element={<AuthGuard />}>
                        <Route path="home" element={<Home />} />
                        <Route path="dashboard" element={<Dashboard />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router