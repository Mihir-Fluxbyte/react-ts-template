import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../contextApi/AuthContext"

type LoginProps = {

}

function Login(props: LoginProps){
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const onLogin = () =>{
        auth?.dispatch({type:'LOGIN', payload:{user:'string',token:'token'}})
        navigate('/home')
    }
    return(
        <>
            <div>Login</div>
            <button onClick={onLogin}>Login</button>
        </>
    )
}

export default Login