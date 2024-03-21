import {useContext} from "react";

import {Layout, Spin} from "antd";
import {AppContent, AppHeader, AppSider} from "./layout/index.js";
import CryptoContext from "../context/crypto-context.jsx";

const AppLayout = () => {

    const {loading} =useContext(CryptoContext)


    if (loading){
        return  <Spin fullscreen />
    }

    return (
        <Layout>

            <AppHeader/>
            <Layout>
                <AppSider/>
                <AppContent/>
            </Layout>

        </Layout>
    );
};

export {AppLayout};
