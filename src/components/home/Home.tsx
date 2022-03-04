import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../contextApi/AuthContext"
import LoadingContext from "../../contextApi/LoadingContext"
import useApiClientService from "../../api/useApiClientService"

type HomeProps = {

}

function Home(props: HomeProps) {
    const api = useApiClientService()
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const loading = useContext(LoadingContext)
    const onLogout = () => {
        auth?.dispatch({ type: 'LOGOUT', payload: {} })
        navigate('/')
    }

    const getApiTest = () => {
        api.ApiGet('/temp').then();
    };
    console.log(loading?.state)
    return (
        <>
            <div>Home</div>
            <div>token {auth?.state.token}</div>
            <button onClick={onLogout}>Logout</button>
            <button onClick={() => { auth?.dispatch({ type: 'LOGIN', payload: { token: `${Math.random()}` } }) }}>Random token </button>
            <button onClick={getApiTest}>Get Item</button>
            <span>Loading {loading?.state.isLoading} {loading?.state.counter}</span>
        </>
    )
}

export default Home