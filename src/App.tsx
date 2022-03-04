import './App.scss';
import AuthContext, {
  authReducer,
  initialAuthState,
} from "./contextApi/AuthContext";
import LoadingContext, { loadingReducer, initialLoadingState } from './contextApi/LoadingContext';
import Provider from './contextApi/Provider';
import Router from "./router";
import Loading from './@shared/components/Loading';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <ReduxProvider store={store}>
      <Provider
        Context={AuthContext}
        initialState={initialAuthState}
        reducer={authReducer}
      >
        <Provider
          Context={LoadingContext}
          initialState={initialLoadingState}
          reducer={loadingReducer}
        >
          <Router />
          <Loading />
        </Provider>
      </Provider>
    </ReduxProvider>
  );
}

export default App;
