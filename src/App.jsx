
import './index.css'

import {CryptoContextProvider} from "./context/crypto-context.jsx";
import {AppLayout} from "./components/App-layout.jsx";






const App = () => {
    return (
        <CryptoContextProvider>
            <AppLayout/>
        </CryptoContextProvider>

    );
};

export {App};
