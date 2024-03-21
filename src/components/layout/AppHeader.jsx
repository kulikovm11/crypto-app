import {Button, Layout, Select, Space, Modal, Drawer} from "antd";
import {useCrypto} from "../../context/crypto-context.jsx";
import {useEffect, useState} from "react";
import {CoinInfoModal} from "../CoinInfoModal.jsx";
import {AddAssetForm} from "../AddAssetForm.jsx";

const headerStyle = {
    width:'100%',
    textAlign: 'center',
    height: 60,
    padding:'1rem',
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    // background:'white'
};




const AppHeader = () => {
    const [select, setSelect] = useState(false)
    const [modal, setModal] = useState(false)
    const [drawer, setDrawer] = useState(false)
    const [coin, setCoin] = useState(null)
    const {crypto} = useCrypto()

    useEffect(() => {
        const keypress = event => {
            if (event.key === '/'){
                setSelect((prevState) => !prevState)
            }
        }
        document.addEventListener('keypress', keypress)
        return () => document.removeEventListener('keypress', keypress)
    },[])


    function handleSelect(value) {
        setCoin(crypto.find((c) => c.id === value))
        setModal(true)
    }
    return ( <Layout.Header style={headerStyle}>
        <Select

            style={{
                width: 250,
            }}
            open={select}
            onSelect={handleSelect}
            onClick={()=>setSelect((prevState) => !prevState)}
            value="press / to open"
            options={crypto.map(c=>(
                {
                     label: c.name,
                     value: c.id,
                     icon:c.icon,

                }
            ))}
            optionRender={(option) => (
                <Space>
                    <img
                        style={{width:20}}
                        src={option.data.icon}
                        alt={option.data.label}/> {option.data.label}
                </Space>
            )}
        />
        <Button type="primary" onClick={()=>setDrawer(true)}>Add Asset</Button>

        <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
            <CoinInfoModal coin={coin} />
        </Modal>

        <Drawer
            width={600}
            title="Add Asset"
            onClose={()=>setDrawer(false)}
            open={drawer}
            destroyOnClose
        >
          <AddAssetForm onClose={()=>setDrawer(false)}/>
        </Drawer>

    </Layout.Header> )
};

export {AppHeader};
