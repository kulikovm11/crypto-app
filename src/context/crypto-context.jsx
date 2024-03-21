import {createContext, useContext, useEffect, useState} from 'react'
import {fakeFetchCrypto, fetchAssets} from "../api.js";
import {percentDifference} from "../utils.js";

const CryptoContext = createContext({
    assets:[],
    crypto:[],
    loading:false,
})


export function CryptoContextProvider ({ children }) {
    const [loading, setIsLoading] = useState(false)
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])

    function mapAssets(assets, result){
        return assets.map(asset=>{
            const coin = result.find(c => c.id === asset.id)
            return {
                grow: asset.price < coin.price,
                growPercent: percentDifference(asset.price, coin.price),
                totalAmount: asset.amount * coin.price,
                totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                name: coin.name,
                ...asset
            }
        })

    }


    useEffect(()=>{
        async function preload () {
            setIsLoading(true)
            const {result} = await fakeFetchCrypto()
            const assets = await fetchAssets()

            setCrypto(result)
            setAssets(mapAssets(assets, result))

            setIsLoading(false)
        }
        preload()
    },[])

    function addAsset(newAsset){
        setAssets((prevState) => mapAssets([...prevState,newAsset], crypto))
    }

    const removeAsset = (id) => {
        const updatedAssets = assets.filter(asset => asset.id !== id);
        setAssets(updatedAssets);
    };




    return (<CryptoContext.Provider value={{loading,crypto,assets,addAsset,removeAsset }}>
                {children}
            </CryptoContext.Provider>)
}

export default CryptoContext

export  function useCrypto (){
    return useContext(CryptoContext)
}
