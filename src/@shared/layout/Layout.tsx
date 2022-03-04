import {Outlet} from 'react-router-dom';

type LayoutProps = {

}

function Layout(props:LayoutProps){
    return(
        <>
            <div>Layout</div>
            <Outlet />
        </>
    )
}

export default Layout