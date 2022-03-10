import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hook';
import { userAction } from '../../store/slice/userSlice';
import { companyAction } from '../../store/slice/companySlice';
import { text } from 'stream/consumers';
type DashboardProps = {
}

export default function Dashboard(props: DashboardProps) {
    const userData = useAppSelector(state => state.user)    
    const dispatch = useAppDispatch()
    const [userInput, setUserInput] = useState({
        name: '',
        email: ''
    })

    const AddUser =() =>{
        dispatch(userAction.load([
            {id:'1',email: 'Mihir.fluxbyte@gmail.com', name:'Mihir'},
            {id:'2',email: 'harsh.fluxbyte@gmail.com', name:'Harsh'},
            {id:'3',email: 'yash.fluxbyte@gmail.com', name:'Yash'},
            {id:'4',email: 'anand.fluxbyte@gmail.com', name:'Anand'},
        ]))
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserInput((state)=>{ 
            return { ...state, [event.target.name]: event.target.value }
        })
    }

    function onSubmitUser(e: FormEvent){
        e?.preventDefault();
        dispatch(userAction.add({...userInput, id: userData.ids.length === 0 ? `1` : `${Math.max(...userData.ids.map(x=> Number(x)))+ 1}`}))
        setUserInput({
            name: '',
            email: ''
        })
    }

    return (
        <>
            <div>Dashboard</div>
            <button onClick={AddUser}>add user</button><br/>
            <form onSubmit={(e)=>onSubmitUser(e)}>
                <input type='text' value={userInput.name} name='name' onChange={handleChange}></input>
                <input type='text' value={userInput.email} name='email' onChange={handleChange}></input>
                <button type='submit' disabled={userInput.email == '' || userInput.name == ''}>Save User</button>
            </form>

            <table style={{width: '100%'}}>
                <tbody>
                    <tr>
                        <th style={{padding:'5px 10px', border:'1px solid red'}}>Id</th>
                        <th style={{padding:'5px 10px', border:'1px solid red'}}>Name</th>
                        <th style={{padding:'5px 10px', border:'1px solid red'}}>Email</th>
                        <th style={{padding:'5px 10px', border:'1px solid red'}}>Delete</th>
                        <th style={{padding:'5px 10px', border:'1px solid red'}}>Edit</th>
                    </tr>
                    {Object.values(userData.entities).map((user)=>(
                        <tr key={user.id} style={{textAlign: 'center'}}>
                            <td style={{padding:'5px 10px', border:'1px solid black'}}>{user.id}</td>
                            <td style={{padding:'5px 10px', border:'1px solid black'}}>{user.name}</td>
                            <td style={{padding:'5px 10px', border:'1px solid black'}}>{user.email}</td>
                            <td style={{padding:'5px 10px', border:'1px solid black'}}>Delete</td>
                            <td style={{padding:'5px 10px', border:'1px solid black'}}>Edit</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
