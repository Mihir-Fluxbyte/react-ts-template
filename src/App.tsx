import './App.scss';
import AuthContext,{
  authReducer,
  initialAuthState,
} from "./contextApi/AuthContext";
import LoadingContext, {loadingReducer, initialLoadingState} from './contextApi/LoadingContext';
import Provider from './contextApi/Provider';
import Router from "./router";
import Loading from './@shared/components/Loading';

function App() {
  return (
    <Provider
      Context = {AuthContext}
      initialState = {initialAuthState}
      reducer = {authReducer}
    >
      <Provider
        Context = {LoadingContext}
        initialState = {initialLoadingState}
        reducer = {loadingReducer}
      >
          <Router />
          <Loading />
      </Provider>
    </Provider>
  );
}

export default App;
