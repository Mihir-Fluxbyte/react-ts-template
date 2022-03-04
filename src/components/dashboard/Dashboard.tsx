import { useAppSelector, useAppDispatch } from '../../store/hook';
import { userAction } from '../../store/slice/userSlice';
type DashboardProps = {
}

export default function Dashboard(props: DashboardProps) {
    const userData = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    console.log(userData)
    const AddUser =() =>{
        dispatch(userAction.add({id:'1',name:'harsh',email:'harsh.fluxbyte@gmail.com'}))
    }
    return (
        <>
            <div>Dashboard</div>
            <button onClick={AddUser}>add user</button>
        </>
    );
}
