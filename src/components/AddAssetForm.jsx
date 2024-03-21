import {useRef, useState} from "react";

import {Divider, Flex, Select, Space, Typography, Form, InputNumber, Button, DatePicker, Result} from "antd";
import {useCrypto} from "../context/crypto-context.jsx";
import {CoinInfo} from "./CoinInfo.jsx";


const validateMessages = {
    required:'${label} is required',
    types:{
        number:'${label} is not valid number'
    },
    number: {
        range:'${label} must be between ${min} and ${max}'
    }
}
const AddAssetForm = ({onClose}) => {
    const [form] = Form.useForm()
    const {crypto, addAsset} = useCrypto()
    const [coin, setCoin] = useState(null)
    const  [submitted, setSubmitted] = useState(false)
    const assetRef = useRef()

    if (submitted){
        return (
            <Result
                status="success"
                title="New asset added"
                subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
                extra={[
                    <Button type="primary" key="console" onClick={onClose}>
                        Close
                    </Button>

                ]}
            />
        )
    }

    if(!coin){
        return (
            <Select
                style={{
                    width:'100%'
                }}
                onSelect={(val)=>setCoin(crypto.find((c)=>c.id === val))}
                placeholder="Select coin"
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
        )
    }

    const onFinish = (values) => {
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date?.$d ?? new Date()
        }
        assetRef.current = newAsset
        setSubmitted(true)
        addAsset(newAsset)
    }

    const handleAmountChange = (value) => {
        const price = form.getFieldValue('price')
        form.setFieldsValue({
        total: +(value * price).toFixed(2)
        })
    }

    const handlePriceChange = (value) => {
        const amount = form.getFieldValue('amount')
        form.setFieldsValue({
            total: +(amount * value ).toFixed(2)
        })
    }

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 10,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                price: +coin.price.toFixed(2),

            }}
            onFinish={onFinish}
            validateMessages={validateMessages}
        >
           <CoinInfo coin={coin}/>
            <Divider/>


                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[
                        {
                            required: true,
                            type:"number",
                            min:0,

                        },
                    ]}
                >
                    <InputNumber
                        placeholder='Enter coin amount'
                        style={{width:'100%'}}
                        onChange={handleAmountChange}
                    />
                </Form.Item>

                <Form.Item label="Date & time" name="date">
                    <DatePicker showTime/>
                </Form.Item>

                <Form.Item label="Price" name="price">
                    <InputNumber onChange={handlePriceChange} style={{width:'100%'}}/>
                </Form.Item>

                <Form.Item label="Total" name="total">
                    <InputNumber disabled style={{width:'100%'}}/>
                </Form.Item>



                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Asset
                    </Button>
                </Form.Item>


        </Form>
    );
};

export {AddAssetForm};
