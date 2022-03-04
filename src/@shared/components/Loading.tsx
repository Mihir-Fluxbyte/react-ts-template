import { useContext } from "react";
import LoadingContext from "../../contextApi/LoadingContext";
import "./Loading.scss"

type LoadingProps = {

}

export default function Loading(props: LoadingProps) {
    const loading = useContext(LoadingContext)
    if (!loading?.state.isLoading) return null;
    return (
        <div className="overlay">
            <div>
                <div className="spinner">
                </div>
            </div>
        </div>
    );
}
