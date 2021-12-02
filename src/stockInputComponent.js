import React from 'react';

import { Input, InputNumber, Button } from 'antd';

class stockComponent extends React.Component {
    render() {
        return (
            <div className="stock-input-form">
                <Input.Group>
                    <Input style={{width: '20%'}} placeholder="Display Name" ></Input>
                    <Input style={{width: '20%'}} placeholder="Item ID"></Input>
                    <InputNumber min={1} style={{width: '10%'}} placeholder="Quantity" ></InputNumber>
                    <InputNumber min={1} style={{width: '10%'}} placeholder="Batch Size"></InputNumber>
                <Button>
                    Add Item
                </Button>
                </Input.Group>
            </div>
        )
    }
}

export default stockComponent